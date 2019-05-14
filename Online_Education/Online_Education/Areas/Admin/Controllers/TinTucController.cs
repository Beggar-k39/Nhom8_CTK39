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
    public class TinTucController : Controller
    {
        OnlineEducationEntities db = new OnlineEducationEntities();
        // GET: Admin/TinTuc
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult Load()
        {
            return Json(new { data = db.TinTucs.ToList() }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult LoadByID(int id)
        {
            return Json(new { data = db.TinTucs.Single(z=>z.ID==id) }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult Add_Edit()
        {
            var inputCount = Request.Form.Count;
            var rID = Request.Form["id"];
            var tt = new TinTuc();
            if (rID != "-1")
            {
                var rId = int.Parse(rID);
                tt = db.TinTucs.Single(z => z.ID == rId);
            }
            tt.TieuDe = Request.Form["tieude"];
            tt.TomTat = Request.Form["tomtat"];
            tt.TrangThai = Request.Form["trangthai"] == "true" ? true : false;
            var noidungRaw = Request.Form["noidung"];
            var noidung = HttpUtility.UrlDecode(noidungRaw);
            tt.NoiDung = noidung;
            tt.MetaTitle = MetaTitle(tt.TieuDe);
            try
            {
                if (rID == "-1")
                {
                    db.TinTucs.Add(tt);
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
        public JsonResult ProcessStatus(int id)
        {
            // Verify
            TinTuc tt = db.TinTucs.Single(z => z.ID==id);
            if (tt != null)
            {
                tt.TrangThai = !tt.TrangThai;
                try
                {
                    db.SaveChanges();
                    return Json(new { data = tt.TrangThai });
                }
                catch
                {
                    return Json(new { data = false });
                }
            }
            return Json(new { data = false });
        }
        public JsonResult Delete(int id)
        {
            // Check Exist
            TinTuc tt = db.TinTucs.Single(z => z.ID == id);
            if (tt != null)
            {
                try
                {
                    db.TinTucs.Remove(tt);
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