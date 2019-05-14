using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Online_Education.Areas.Admin.Models;
namespace Online_Education.Areas.Admin.Controllers
{
    [Authorize]
    public class GopYController : Controller
    {
        OnlineEducationEntities db = new OnlineEducationEntities();
        // GET: Admin/GopY
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult Load()
        {
            return Json(new { data = db.Gopies.ToList() },JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Delete(string id)
        {
            int rId = int.Parse(id);
            var gy = db.Gopies.Single(z => z.ID == rId);
            if (gy != null)
            {
                db.Gopies.Remove(gy);
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