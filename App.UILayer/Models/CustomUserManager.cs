using Microsoft.AspNet.Identity;
using System.Threading.Tasks;

namespace App.UILayer.Models
{
    public class CustomUserManager : UserManager<ApplicationUser>
    {
        public CustomUserManager()
            : base(new CustomUserSore<ApplicationUser>())
        {

        }

        public override Task<ApplicationUser> FindAsync(string userName, string password)
        {
            var taskInvoke = Task<ApplicationUser>.Factory.StartNew(() =>
                {
                    if (userName == "pmurphy" && password == "wqa")
                    {
                        return new ApplicationUser { Id= "pmurphy", UserName = "pmurphy", Roles = new[] {"PARENT"}, DeptSeq = 27};
                    }
                    else if (userName == "preddy" && password == "wqa")
                    {
                        return new ApplicationUser { Id = "preddy", UserName = "preddy", Roles = new[] { "SYS_ADMIN" }, DeptSeq = 19};
                    }
                    return null;
                });

            return taskInvoke;
        }
    }
}