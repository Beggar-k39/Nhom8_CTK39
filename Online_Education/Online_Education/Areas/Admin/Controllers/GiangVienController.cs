using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Online_Education.Areas.Admin.Models;
namespace Online_Education.Areas.Admin.Controllers
{
    [Authorize]
    public class GiangVienController : Controller
    {
        OnlineEducationEntities db = new OnlineEducationEntities();
        // GET: Admin/GiangVien
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
            return Json(new { data = db.GiangViens.ToList() }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult LoadByID(int id)
        {
            return Json(new { data = db.GiangViens.Single(z => z.ID == id) }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add_Edit()
        {
            var fileCount = Request.Files.Count;
            var count_form = Request.Form.Count;
            var rID = Request.Form["id"];
            var gv = new GiangVien();
            if (rID != "-1")
            {
                var rId = int.Parse(rID);
                gv = db.GiangViens.Single(z => z.ID == rId);
            }
            gv.HoTen_GV= Request.Form["hotengv"];
            gv.NgaySinh= DateFormat(Request.Form["ngaysinh"]);
            gv.SDT= Request.Form["sdt"];
            gv.Email= Request.Form["email"];
            gv.DiaChi= Request.Form["diachi"];
            gv.SoGioGiang= int.Parse(Request.Form["sogiogiang"]);
            gv.Luong= int.Parse(Request.Form["luong"]);

            gv.IDTaiKhoan = int.Parse(Request.Form["idtaikhoan"]);

            var motaRaw = Request.Form["mota"];
            var mota = HttpUtility.UrlDecode(motaRaw);
            gv.MoTa = mota;
            if (rID == "-1")// Just Add Info
            {
                var idTK = int.Parse(Request.Form["idtaikhoan"]);
                var lgv = db.TaiKhoans.Where(z => z.IDChucVu == 2);
                var taikhoan = lgv.SingleOrDefault(z => z.ID == idTK);
                if (taikhoan == null) // Not Create TK
                {
                    return Json(new { data = false });
                }
                if (taikhoan != null)
                {
                    var giangvien = db.GiangViens.SingleOrDefault(z => z.IDTaiKhoan == taikhoan.ID);
                    if (giangvien != null)
                    {    // Already have infomation connect to this account
                        return Json(new { data = false });
                    }
                    else
                    {
                        gv.IDTaiKhoan = idTK; // Have account but not have infomation
                    }
                }
            }
            if (fileCount == 1)// Have data file image in [input file]
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
                    gv.Anh = fileAnh.FileName;
                }
            }
            try
            {
                if (rID == "-1")
                {
                    db.GiangViens.Add(gv);
                }
                db.SaveChanges();
                return Json(new { data = true });
            }
            catch
            {
                return Json(new { data = false });
            }
        }
        [HttpPost]
        public JsonResult Delete(int id)
        {
            // Check Exist
            GiangVien gv = db.GiangViens.Single(z => z.ID == id);
            if (gv != null)
            {
                var path = Path.Combine(Server.MapPath("~/HinhAnh"), gv.Anh);
                if (System.IO.File.Exists(path))
                {
                    System.IO.File.Delete(path);
                }
                try
                {
                    db.GiangViens.Remove(gv);
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
        public string DateFormat(string date)
        {
            return date.Replace('-', '/');
        }
    }
}