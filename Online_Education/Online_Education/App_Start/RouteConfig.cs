using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Online_Education
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {

            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute(
            name: "CourseDetail",
            url: "khoa-hoc/{MetaTitle}-{cateId}",
            defaults: new { controller = "Course", action = "CourseDetail", id = UrlParameter.Optional }
        );

            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                 namespaces: new[] { "Online_Education.Controllers" } // Thai Don't know what is it ... But Delete => Error Admin
            );
        }
    }
}
