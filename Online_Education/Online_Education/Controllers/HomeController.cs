using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Online_Education.ChucNang;
using PagedList;
using PagedList.Mvc;

namespace Online_Education.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var model = new TinTucD().ListAll();
            return PartialView(model);
        }
        public ActionResult Introduce()
        {
            return View();
        }
        public ActionResult Contact()
        {
            return View();
        }
        public ActionResult Gallery()
        {
            return View();
        }
        public ActionResult Professiors()
        {
            var model = new GiangVienD().ListAll();
            return PartialView(model);
        }
        public PartialViewResult Course(int? page)
        {

            int pageSize = 6;
            int pageNumber = (page ?? 1);
            var model = new KhoaHocD().ListAll();
            return PartialView(model.ToPagedList(pageNumber, pageSize));
        }
        public ActionResult Login()
        {
            return View();
        }
        public ActionResult Register()
        {
            return View();
        }

        public PartialViewResult SideBar()
        {


            var model = new LoaiKhoaHocD().ListAll();
            return PartialView(model);
        }


    }
}