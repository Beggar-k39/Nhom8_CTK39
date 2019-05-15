using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Online_Education.ChucNang;
namespace Online_Education.Controllers
{
    public class CourseController : Controller
    {
        // GET: Course
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CourseDetail(int cateId)
        {
            var course = new KhoaHocD().ViewDetail(cateId);
            return View(course);

        }

        public PartialViewResult CourseGanNhat()
        {
            var model = new KhoaHocD().List4();
            return PartialView(model);
        }
    }
}