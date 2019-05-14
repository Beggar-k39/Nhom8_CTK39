using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Online_Education.Areas.Admin.Models;
using System.Security.Cryptography;
using System.Text;

namespace Online_Education.Areas.Admin.Controllers
{
    [Authorize]
    public class TaiKhoanController : Controller
    {
        OnlineEducationEntities db = new OnlineEducationEntities();
        // GET: Admin/TaiKhoan
        public ActionResult Index()
        {
            if (Session["IDChucVu"].ToString() != "1")
            {
                Response.StatusCode = 404;
                return null;
            }
            return View();
        }
        [HttpGet]
        public JsonResult Load()
        {
            //var x = db.ChucVus.Single(z=>z.ID==id);
            //return Json(new { data = x }, JsonRequestBehavior.AllowGet);
            return Json(new { data = db.TaiKhoans.ToList() }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult FindChucVu(string id)
        {
            var rId = int.Parse(id);
            return Json(new { data = db.ChucVus.Single(z => z.ID == rId).TenChucVu }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult SwitchesControl(int id)
        {
            // Check Exists
            var tk = db.TaiKhoans.Single(z => z.ID == id);
            if (tk != null)
            {
                tk.TrangThai = !tk.TrangThai;
            }
            try
            {
                db.SaveChanges();
                return Json(new { data = true, status = tk.TrangThai, name = tk.TenDangNhap }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { data = false }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpGet]
        public JsonResult LoadByID(int id)
        {
            return Json(new { data = db.TaiKhoans.Single(z => z.ID == id) }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult LayChucVu()
        {
            return Json(new { data = db.ChucVus.OrderByDescending(z => z.ID).ToList() }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetTenTaiKhoan(string id, string idcv)
        {
            var rId = int.Parse(id);
            var rIdcv = int.Parse(idcv);
            var ten = "Anonymous";
            if (rIdcv == 2)
            {
                ten = db.GiangViens.SingleOrDefault(z => z.IDTaiKhoan == rId).HoTen_GV;
            }
            else if(rIdcv == 3)
            {
                ten = db.HocViens.SingleOrDefault(z => z.IDTaiKhoan == rId).HoTen;
            }
            return Json(new { data = ten }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Add_Edit(string id, string tendangnhap, string matkhau, bool? trangthai, string chucvu)
        {
            var taikhoan = new TaiKhoan();
            if (id != null)
            {
                var rId = int.Parse(id);
                taikhoan = db.TaiKhoans.Single(z => z.ID == rId);
            }
            taikhoan.TenDangNhap = tendangnhap;
            if (id == null)
            {
                taikhoan.MatKhau = GetHashString(matkhau);
            }
            taikhoan.TrangThai = trangthai;
            taikhoan.IDChucVu = int.Parse(chucvu);
            if (id == null)
            {
                taikhoan.NgayTao = DateTime.Now.ToString("dd/MM/yyyy").ToString();
            }
            try
            {
                if (id == null)
                {
                    db.TaiKhoans.Add(taikhoan);
                }
                db.SaveChanges();
                return Json(new { data = true });
            }
            catch
            {
                return Json(new { data = false });
            }
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
        [HttpPost]
        public JsonResult Delete(string id)
        {
            var rId = int.Parse(id);
            var tk = db.TaiKhoans.Single(z => z.ID == rId);
            if (tk != null)
            {
                db.TaiKhoans.Remove(tk);
                try
                {
                    db.SaveChanges();
                    return Json(new { data = true });
                }
                catch
                {
                    return Json(new { data = false });
                }
            }
            return Json(new { data = false });
        }
    }
}