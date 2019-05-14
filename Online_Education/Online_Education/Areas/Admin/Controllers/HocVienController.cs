using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Online_Education.Areas.Admin.Models;
namespace Online_Education.Areas.Admin.Controllers
{
    [Authorize]
    public class HocVienController : Controller
    {
        OnlineEducationEntities db = new OnlineEducationEntities();
        // GET: Admin/HocVien
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult Load()
        {
            return Json(new { data = db.HocViens.ToList() },JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult LoadByID(int id)
        {
            return Json(new { data = db.HocViens.Single(z => z.ID == id) }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Add_Edit(string id, string hoten, string ngaysinh,string sdt,string email,string diachi,string idtaikhoan)
        {
            var hv = new HocVien();
            if (id != null)
            {
                var rId = int.Parse(id);
                hv = db.HocViens.Single(z => z.ID == rId);
            }
            hv.HoTen = hoten;
            hv.NgaySinh = ngaysinh.Replace('-','/');
            hv.SDT = sdt;
            hv.Email = email;
            hv.DiaChi = diachi;
            if (id == null)// Just Add Info
            {
                var idTK = int.Parse(idtaikhoan);
                var lhv = db.TaiKhoans.Where(z=>z.IDChucVu==3);
                var taikhoan=lhv.SingleOrDefault(z => z.ID == idTK);
                if (taikhoan == null) // Not Create TK
                {
                    return Json(new { data = false });
                }
                if (taikhoan != null)
                {
                    var hocvien = db.HocViens.SingleOrDefault(z => z.IDTaiKhoan == taikhoan.ID);
                    if (hocvien != null)
                    {    // Already have infomation connect to this account
                        return Json(new { data = false });
                    }
                    else
                    {
                        hv.IDTaiKhoan = idTK; // Have account but not have infomation
                    }
                }
            }
            try
            {
                if (id == null)
                {
                    db.HocViens.Add(hv);
                }
                db.SaveChanges();
                return Json(new { data = true });
            }
            catch
            {
                return Json(new { data = false });
            }
        }
        public JsonResult Delete(string id)
        {
            int rId = int.Parse(id);
            var hv = db.HocViens.Single(z=>z.ID==rId);
            if (hv != null)
            {
                db.HocViens.Remove(hv);
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