using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;

namespace CatsDB.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            if(User.Identity.IsAuthenticated) {
                return View();
            } else {
                return View("Splash");
            }
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
