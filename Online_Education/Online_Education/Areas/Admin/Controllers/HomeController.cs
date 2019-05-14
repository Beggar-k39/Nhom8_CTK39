using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

using Online_Education.Areas.Admin.Models;
namespace Online_Education.Areas.Admin.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        OnlineEducationEntities db = new OnlineEducationEntities();

        // GET: Admin/Home
        [HttpGet]
        public ActionResult Index()
        {
            if (Session["IDChucVu"].ToString() != "1")
            {
                return RedirectToAction("Index", "KhoaHoc");
            }
            return View();
        }
        [HttpGet]
        public JsonResult Load()
        {
            return Json(new { data = db.LoaiKhoaHocs.ToList()},JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult LoadByID(int id)
        {
            return Json(new { data = db.LoaiKhoaHocs.Single(z => z.ID == id) },JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Add_Edit(string id, string tenlkh, string mota)
        {
            var lkh = new LoaiKhoaHoc();
            if (id != null)
            {
                var rId = int.Parse(id);
                lkh = db.LoaiKhoaHocs.Single(z => z.ID == rId);
            }
            lkh.TenLoaiKhoaHoc = tenlkh;
            lkh.MoTa = mota;
            lkh.MetaTitle = MetaTitle(tenlkh);
            try
            {
                if (id == null)
                {
                    db.LoaiKhoaHocs.Add(lkh);
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
            LoaiKhoaHoc lkh = db.LoaiKhoaHocs.Single(z => z.ID == id);
            if (lkh != null)
            {
                try
                {
                    db.LoaiKhoaHocs.Remove(lkh);
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