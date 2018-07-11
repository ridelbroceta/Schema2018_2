using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using App.UILayer.Models;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;

namespace App.UILayer.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private CustomUserManager CustomUserManager { get; set; }

        public AccountController()
            : this(new CustomUserManager())
        {
        }

        public AccountController(CustomUserManager customUserManager)
        {
            CustomUserManager = customUserManager;
        }

        //
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            if (Request.IsAuthenticated) return RedirectToAction("LogOff", "Account", new { returnUrl });

            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                var user = await CustomUserManager.FindAsync(model.UserName, model.Password);
                if (user != null)
                {
                    await SignInAsync(user, model.RememberMe);
                    return RedirectToLocal(returnUrl, user.Roles);
                }
                else
                {
                    ModelState.AddModelError("", "Invalid username or password.");
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        public ActionResult LogOff(string returnUrl)
        {
            AuthenticationManager.SignOut();

            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Login", "Account");
        }

        // POST: /Account/LogOff
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff()
        {
            AuthenticationManager.SignOut();
            return RedirectToAction("Index", "Home");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing && CustomUserManager != null)
            {
                CustomUserManager.Dispose();
                CustomUserManager = null;
            }
            base.Dispose(disposing);
        }

        #region Helpers

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private async Task SignInAsync(ApplicationUser user, bool isPersistent)
        {

            /* https://stackoverflow.com/questions/31511386/owin-cookie-authentication-without-asp-net-identity 
             */

            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);

            //if (CustomUserManager.SupportsUserRole)
            //{
            //    user.add
            //}
            var identity = await CustomUserManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
            identity.AddClaim(new Claim("DeptSeq", user.DeptSeq.ToString()));
            identity.AddClaim(new Claim(ClaimTypes.Locality, user.DeptSeq.ToString()));
            if (user.Roles.Any())
            {
                var roleClaims = user.Roles.Select(r => new Claim(ClaimTypes.Role, r));
                identity.AddClaims(roleClaims);
            }

            AuthenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = isPersistent }, identity);
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private ActionResult RedirectToLocal(string returnUrl, string[] roles = null)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            //var myUser = AuthenticationManager.User;
            if (roles != null && roles.Any() && roles.Contains("PARENT"))
            {
                //return RedirectToAction("Index", "Home");
                //return RedirectToAction("Index", "Parent");
            }
            if (roles != null && roles.Any() && roles.Contains("SYS_ADMIN"))
            {
                //return RedirectToAction("Index", "Home");
                //return RedirectToAction("Index", "Reviewer");
            }
            return RedirectToAction("Index", "Home");



        }

        #endregion
    }
}