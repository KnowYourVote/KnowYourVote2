using System.Web.Mvc;

namespace KnowYourVote2.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return IndexLoggedIn();
        }

        public ActionResult IndexLoggedIn()
        {
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

        public ActionResult LearnMore()
        {
            ViewBag.Message = "Learn more about our Government here.";
            return View();
        }

        public ActionResult Login()
        {
            ViewBag.Message = "Login here.";
            return View();
        }

    }
}