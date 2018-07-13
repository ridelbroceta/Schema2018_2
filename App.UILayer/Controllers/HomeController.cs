using System.Web.Mvc;
using App.BusinessLayer.Contracts.Core;
using App.BusinessLayer.Contracts.ReadServices;
using App.BusinessLayer.Contracts.WriteServices;
using App.UILayer.Business;

namespace App.UILayer.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index(IReadEntityTestService readEntityTestService, IWriteEntityTestService writeEntityTestService)
        {
            var t = readEntityTestService.GetMyEntityTest(1);
            var value = writeEntityTestService.Save(t);
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