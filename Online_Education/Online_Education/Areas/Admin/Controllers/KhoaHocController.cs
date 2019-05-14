using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

using Online_Education.Areas.Admin.Models;
namespace Online_Education.Areas.Admin.Controllers
{
    [Authorize]
    public class KhoaHocController : Controller
    {
        OnlineEducationEntities db = new OnlineEducationEntities();
        // GET: Admin/KhoaHoc
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult Load()
        {
            return Json(new { data = db.KhoaHocs.ToList() }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult LoadByID(int id)
        {
            return Json(new { data = db.KhoaHocs.Single(z=>z.ID==id) }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult LoadLoaiKhoaHoc()
        {
            return Json(new { data = db.LoaiKhoaHocs.ToList() }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult LoadGiangVien()
        {
            return Json(new { data = db.GiangViens.ToList() }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult ProcessStatus(string id)
        {
            var rID = int.Parse(id);
            var kh = db.KhoaHocs.Single(z => z.ID == rID);
            if (kh != null)
            {
                kh.TrangThai = !kh.TrangThai;
                try
                {
                    db.SaveChanges();
                    return Json(new { data = true, status = kh.TrangThai });
                }
                catch
                {
                    return Json(new { data = false, status = kh.TrangThai });
                }

            }
            return Json(new { data = false, status = kh.TrangThai });
        }
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult Add_Edit()
        {
            var fileCount = Request.Files.Count;
            var inputCount = Request.Form.Count;
            var rID = Request.Form["id"];
            var khoahoc = new KhoaHoc();
            if (rID!= "-1")
            {
                var rId = int.Parse(rID);
                khoahoc = db.KhoaHocs.Single(z => z.ID == rId);
            }
            khoahoc.TenKhoaHoc = Request.Form["tenkhoahoc"];
            khoahoc.HocPhi = int.Parse(Request.Form["hocphi"]);
            khoahoc.ThoiGianBatDau =DateFormat(Request.Form["ngaybatdau"]);
            khoahoc.ThoiGianKetThuc =DateFormat(Request.Form["ngayketthuc"]);
            khoahoc.LichHoc = Request.Form["lichhoc"];
            khoahoc.TrangThai = Request.Form["trangthai"]=="true"?true:false;
            khoahoc.IDLoaiKhoaHoc = int.Parse(Request.Form["idlkh"]);
            khoahoc.IDGiangVien = int.Parse(Request.Form["idgv"]);
            var motaRaw = Request.Form["mota"];
            var mota = HttpUtility.UrlDecode(motaRaw);
            khoahoc.MoTa = mota;
            khoahoc.MetaTitle = MetaTitle(Request.Form["tenkhoahoc"]);
            if (fileCount==1)// Have data file image in [input file]
            {
                var fileAnh = Request.Files["anh"];
                var path = Path.Combine(Server.MapPath("~/HinhAnh"), fileAnh.FileName);
                if (System.IO.File.Exists(path))
                {
                    System.IO.File.Delete(path);
                }
                else
                {
                    fileAnh.SaveAs(path);
                    khoahoc.Anh = fileAnh.FileName;
                }
            }
            try
            {
                if (rID == "-1")
                {
                    db.KhoaHocs.Add(khoahoc);
                }
                db.SaveChanges();
                return Json(new { data = true });
            }
            catch
            {
                return Json(new { data = false });
            }
        }
        public string DateFormat(string date)
        {
            return date.Replace('-', '/');
        }
        [HttpPost]
        public JsonResult Delete(int id)
        {
            // Check Exist
            KhoaHoc kh = db.KhoaHocs.Single(z => z.ID == id);
            if (kh != null)
            {
                var path = Path.Combine(Server.MapPath("~/HinhAnh"), kh.Anh);
                if (System.IO.File.Exists(path))
                {
                    System.IO.File.Delete(path);
                }
                try
                {
                    db.KhoaHocs.Remove(kh);
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
        #region CustomGroup8
        // Remove unicode VietNamese
        static Regex ConvertToUnsign_rg = null;
        public static string ConvertToUnsign(string strInput)
        {
            if (ReferenceEquals(ConvertToUnsign_rg, null))
            {
                ConvertToUnsign_rg = new Regex("\\p{IsCombiningDiacriticalMarks}+");
            }
            var temp = strInput.Normalize(NormalizationForm.FormD);
            return ConvertToUnsign_rg.Replace(temp, string.Empty).Replace("đ", "d").Replace("Đ", "D").ToLower();
        }
        // Change space to "-"
        public string MetaTitle(string strName)
        {
            string str = ConvertToUnsign(strName.Trim());
            string meta = str.Replace(" ", "-").Trim();
            return meta;
        }
        #endregion CustomGroup8
    }
}