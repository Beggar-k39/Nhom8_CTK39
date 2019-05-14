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
    public class InfoController : Controller
    {
        OnlineEducationEntities db = new OnlineEducationEntities();
        // GET: Admin/Info
        public ActionResult Index()
        {
            if (Session["TaiKhoan"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            TaiKhoan tk = (TaiKhoan)Session["TaiKhoan"];
            int idtk = tk.ID;
            int? idcv = tk.IDChucVu;
            if (idcv == 1)
            {
                return null;
            }
            // Verify
            GiangVien gv = db.GiangViens.SingleOrDefault(z => z.IDTaiKhoan == idtk);
            if (gv != null)
            {
                ViewBag.GiangVien = gv;
            }
            return View(gv);
        }
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult SuaThongTin(FormCollection fc,HttpPostedFileBase file)
        {
            int idtk = int.Parse(fc["idtk"]);
            GiangVien gv = db.GiangViens.SingleOrDefault(z => z.IDTaiKhoan == idtk);
            if (file != null)
            {
                gv.Anh = file.FileName;
                var path = Path.Combine(Server.MapPath("../../HinhAnh"), file.FileName);
                file.SaveAs(path);
            }
            if (gv != null)
            {
                gv.HoTen_GV = fc["hotengv"];
                gv.NgaySinh = fc["ngaysinh"];
                gv.SDT = fc["sdt"];
                gv.Email = fc["email"];
                gv.DiaChi = fc["diachi"];
                gv.MoTa = fc["mota1"];

                db.SaveChanges();
            }
            return RedirectToAction("Index");

        }
    }
}