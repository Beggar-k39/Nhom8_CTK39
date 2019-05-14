using System.Web.Mvc;

namespace Online_Education.Areas.Admin
{
    public class AdminAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Admin";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                name: "HomeRedirect",
                url: "Admin/Home/Index",
                defaults: new { controller = "Home", action = "Index", redirect = true } // Access to admin page from login
             );
            context.MapRoute(
            name: "KhoaHocRedirect",
            url: "Admin/KhoaHoc/Index",
            defaults: new { controller = "KhoaHoc", action = "Index", redirect = true } // Access to admin page from login
             );
            context.MapRoute(
                "Admin_default",
                "Admin/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional },
                new[] { "Online_Education.Areas.Admin.Controllers" } //Thai Don't know what is it ... But Delete => Error Client
            );
        }
    }
}