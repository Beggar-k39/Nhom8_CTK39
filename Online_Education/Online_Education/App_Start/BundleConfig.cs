using System.Web;
using System.Web.Optimization;

namespace Online_Education
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/Back_End/assets/css/bootstrap.min.css",
                "~/Content/Back_End/assets/font-awesome/4.5.0/css/font-awesome.min.css",
                "~/Content/Back_End/assets/css/fonts.googleapis.com.css",
                "~/Content/Back_End/assets/css/ace.min.css",
                //Form
                "~/Content/Back_End/assets/css/jquery-ui.custom.min.css",
                "~/Content/Back_End/assets/css/chosen.min.css",
                "~/Content/Back_End/assets/css/bootstrap-datepicker3.min.css",
                "~/Content/Back_End/assets/css/bootstrap-timepicker.min.css",
                "~/Content/Back_End/assets/css/daterangepicker.min.css",
                "~/Content/Back_End/assets/css/bootstrap-datetimepicker.min.css",
                "~/Content/Back_End/assets/css/bootstrap-colorpicker.min.css",
                "~/Content/Back_End/assets/css/jquery.gritter.min.css",
                "~/Content/Back_End/assets/css/ace-skins.min.css",
                "~/Content/Back_End/assets/css/ace-rtl.min.css",
                // Preload
                "~/Scripts/js_BackEnd/Loading/src/css/preloader.css"
                ));
            bundles.Add(new ScriptBundle("~/Content/scripts").Include(
                "~/Content/Back_End/assets/js/jquery-2.1.4.min.js",
                "~/Content/Back_End/assets/js/bootstrap.min.js",
                // Data Table
                "~/Content/Back_End/assets/js/jquery.dataTables.min.js",
                "~/Content/Back_End/assets/js/jquery.dataTables.bootstrap.min.js",
                "~/Content/Back_End/assets/js/dataTables.buttons.min.js",
                "~/Content/Back_End/assets/js/buttons.flash.min.js",
                "~/Content/Back_End/assets/js/buttons.html5.min.js",
                "~/Content/Back_End/assets/js/buttons.print.min.js",
                "~/Content/Back_End/assets/js/buttons.colVis.min.js",
                "~/Content/Back_End/assets/js/dataTables.select.min.js",
                // Form
                "~/Content/Back_End/assets/js/jquery-ui.custom.min.js",
                "~/Content/Back_End/assets/js/jquery.ui.touch-punch.min.js",
                "~/Content/Back_End/assets/js/chosen.jquery.min.js",
                "~/Content/Back_End/assets/js/spinbox.min.js",
                "~/Content/Back_End/assets/js/bootstrap-datepicker.min.js",
                "~/Content/Back_End/assets/js/bootstrap-timepicker.min.js",
                "~/Content/Back_End/assets/js/moment.min.js",
                "~/Content/Back_End/assets/js/daterangepicker.min.js",
                "~/Content/Back_End/assets/js/bootstrap-datetimepicker.min.js",
                "~/Content/Back_End/assets/js/bootstrap-colorpicker.min.js",
                "~/Content/Back_End/assets/js/jquery.knob.min.js",
                "~/Content/Back_End/assets/js/autosize.min.js",
                "~/Content/Back_End/assets/js/jquery.inputlimiter.min.js",
                "~/Content/Back_End/assets/js/jquery.maskedinput.min.js",
                "~/Content/Back_End/assets/js/bootstrap-tag.min.js",
                "~/Scripts/js_BackEnd/Form.js",
                // Group 8 custom
                "~/Scripts/js_BackEnd/bootbox/bootbox.min.js",
                "~/Scripts/js_BackEnd/Loading/src/js/jquery.preloader.min.js",
                "~/Content/Back_End/assets/js/jquery.gritter.min.js",
                "~/Scripts/js_BackEnd/ckeditor/ckeditor.js",
                //"~/Scripts/js_BackEnd/ckeditor/ckeditor.js",
                //ACE
                "~/Content/Back_End/assets/js/ace-elements.min.js",
                "~/Content/Back_End/assets/js/ace.min.js"

                //Group 8 custom -> Controller
                ));
       
        }
    }
}
