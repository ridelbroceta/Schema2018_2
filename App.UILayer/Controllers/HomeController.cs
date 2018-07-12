using System.Web.Mvc;
using App.BusinessLayer.Contracts.Core;
using App.UILayer.Business;

namespace App.UILayer.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index(IFirstTest firstTest, IRepository repository)
        {
            var values = firstTest.GetValues();
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}