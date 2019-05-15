using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Online_Education.Areas.Admin.Models;
using System.Web.Security;
using System.Security.Cryptography;
using System.Text;
using System.Net.Mail;
using System.Net;
using System.Web.UI;

namespace Online_Education.Controllers
{
    public class LoginController : Controller
    {
        private static string username = "";
        private static string email = "";
        private static string code = "";
        private static string codeIP = "";
        OnlineEducationEntities db = new OnlineEducationEntities();
        // GET: Login
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public ActionResult Register()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Register(FormCollection fc)
        {
            var hoten = fc["hoTen"].ToString();
            var gioitinh = fc["gioiTinh"].ToString();
            var ngay = fc["day"].ToString();
            var thang = fc["month"].ToString();
            var nam = fc["year"].ToString();
            var ngaysinh = ngay + "/" + thang + "/" + nam;

            // Validate TenDangNhap
            var tendangnhap = fc["tendangnhap"].ToString();
            TaiKhoan taikhoan = db.TaiKhoans.SingleOrDefault(z => z.TenDangNhap == tendangnhap);
            if (taikhoan != null)
            {
                ModelState.AddModelError("","Tên tài khoản đã tồn tại");
                return View("Register");
            }
            var email = fc["email"].ToString();
            var matkhau = fc["matkhau"].ToString();

            TaiKhoan tk = new TaiKhoan();
            tk.TenDangNhap = tendangnhap; 
            tk.MatKhau = GetHashString(matkhau);
            tk.NgayTao = DateTime.Now.ToString("dd/MM/yyyy").ToString();
            tk.IDChucVu = 3;
            tk.TrangThai = true;
            db.TaiKhoans.Add(tk);
            db.SaveChanges();
            var idtk = db.TaiKhoans.SingleOrDefault(z => z.TenDangNhap == tendangnhap).ID;
            HocVien hv = new HocVien();
            hv.HoTen = hoten;
            hv.NgaySinh = ngaysinh;
            hv.Email = email;
            hv.IDTaiKhoan = idtk;
            db.HocViens.Add(hv);
            db.SaveChanges();
            
            return RedirectToAction("Index", "Home");
        }
        [HttpGet]
        public ActionResult Login()
        {
            return View("Index");
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(FormCollection fc)
        {
            string tk = fc["userName"].ToString();
            string mk = fc["passWord"].ToString();
            if (tk == "" || mk == "")
            {
                ModelState.AddModelError("", "Vui lòng điền đẩy đủ thông tin");
                return View("Index");
            }
            string matkhauhash = GetHashString(mk);
            TaiKhoan taikhoan = db.TaiKhoans.SingleOrDefault(z => z.TenDangNhap == tk && z.MatKhau == matkhauhash && z.TrangThai == true);
            if (taikhoan != null)
            {
                Session["TaiKhoan"] = taikhoan;
                var ten = "";
                var hinh = "";
                if (taikhoan.IDChucVu == 2)
                {
                    ten = db.GiangViens.SingleOrDefault(z => z.IDTaiKhoan == taikhoan.ID).HoTen_GV;
                    hinh = db.GiangViens.SingleOrDefault(z => z.IDTaiKhoan == taikhoan.ID).Anh;
                    Session["Anh"] = hinh;
                    Session["IDChucVu"] = taikhoan.IDChucVu;
                    FormsAuthentication.SetAuthCookie(ten, false);
                    return RedirectToAction("Index", "Home");
                }
                else if (taikhoan.IDChucVu == 3)
                {
                    ten = taikhoan.TenDangNhap;
                    Session["Anh"] = "Admin";
                    Session["IDChucVu"] = taikhoan.IDChucVu;
                    FormsAuthentication.SetAuthCookie(ten, false);
                    return RedirectToAction("Index", "Home");
                }

                  else
                {
                    ten = taikhoan.TenDangNhap;
                    Session["Anh"] = "Admin";
                    Session["IDChucVu"] = taikhoan.IDChucVu;
                    FormsAuthentication.SetAuthCookie(ten, false);
                    return RedirectToAction("Index", "Home");
                }
               
            }
            else
            {
                ModelState.AddModelError("", "Tên đăng nhập hoặc mật khẩu không đúng!");
            }
            return View("Index");
        }
        #region HashFunction
        public static byte[] GetHash(string inputString)
        {
            HashAlgorithm algorithm = SHA256.Create();
            return algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));
        }
        public static string GetHashString(string inputString)
        {
            StringBuilder sb = new StringBuilder();
            foreach (byte b in GetHash(inputString))
                sb.Append(b.ToString("X2"));

            return sb.ToString();
        }
        #endregion
        #region RandomString
        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        #endregion
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();
            return RedirectToAction("Index", "Login");
        }
        [HttpGet]
        public ActionResult ForgotPassWord()
        {
            return View();
        }
        [HttpGet]
        public ActionResult Verify()
        {
            if (username == "" || email == "")
            {
                Response.StatusCode = 404;
                return null;
            }
            return View();
        }
        [HttpGet]
        public ActionResult ChangePassWord()
        {
            if (username == "" || email == "" || codeIP == ""||code!=codeIP)
            {
                Response.StatusCode = 404;
                return null;
            }
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ChangePassWord(FormCollection fc)
        {
            string pswN = fc["newpsw"].ToString();
            if (pswN != "")
            {
                string encrypt = GetHashString(pswN);
                var taikhoan = db.TaiKhoans.SingleOrDefault(z => z.TenDangNhap == username);
                if (taikhoan != null)
                {
                    taikhoan.MatKhau = encrypt;
                    db.SaveChanges();
                }
                username = "";
                email = "";
                code = "";
                codeIP = "";
            }
            else
            {
                ModelState.AddModelError("", "Vui lòng nhập mật khẩu mới");
                return View("ChangePassWord");
            }
            return RedirectToAction("Login");
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Verify(FormCollection fc)
        {
            codeIP = fc["code"].ToString();

            if (codeIP == "")
            {
                ModelState.AddModelError("", "Vui lòng nhập mã xác nhận");
                return View("Verify");
            }
            if (code != codeIP)
            {
                ModelState.AddModelError("", "Mã xác nhận không đúng");
                return View("Verify");
            }
            else if (code == codeIP)
            {
                return RedirectToAction("ChangePassWord");
            }
            return RedirectToAction("Verify");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ForgotPassWord(FormCollection fc)
        {
            username = fc["username"].ToString();
            email = fc["email"].ToString();
            #region Verify
            if (username == "" || email == "")
            {
                ModelState.AddModelError("", "Thông tin chưa đầy đủ");
                return View("ForgotPassWord");
            }
            var taikhoan = db.TaiKhoans.SingleOrDefault(z => z.TenDangNhap == username);
            if (taikhoan == null)
            {
                ModelState.AddModelError("", "Tên tài khoản không tồn tại!");
                return View("ForgotPassWord");
            }
            if (taikhoan.IDChucVu == 3)
            {
                var em = db.HocViens.SingleOrDefault(z => z.Email == email && z.IDTaiKhoan == taikhoan.ID);
                if (em == null)
                {
                    ModelState.AddModelError("", "Email học viên không khớp!");
                    return View("ForgotPassWord");
                }
            }
            else if (taikhoan.IDChucVu == 2)
            {
                var gv = db.GiangViens.SingleOrDefault(z => z.Email == email && z.IDTaiKhoan == taikhoan.ID);
                if (gv == null)
                {
                    ModelState.AddModelError("", "Email giảng viên không khớp!");
                    return View("ForgotPassWord");
                }
            }
            #endregion
            try
            {
                SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
                client.EnableSsl = true;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential("quocthai0099@gmail.com", "thai01649997622");
                MailMessage msgobj = new MailMessage();
                msgobj.To.Add(email);
                msgobj.From = new MailAddress("quocthai0099@gmail.com");
                msgobj.Subject = "Thông báo xác nhận quên mật khẩu";
                code = RandomString(10);
                msgobj.Body = "Mã xác nhận của bạn là : " + code;
                client.Send(msgobj);
            }
            catch (Exception ex)
            {
                Response.Write("Could not send email" + ex.Message);
            }
            return RedirectToAction("Verify");
        }
    }
}