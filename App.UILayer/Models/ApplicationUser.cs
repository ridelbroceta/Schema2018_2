using Microsoft.AspNet.Identity;

namespace App.UILayer.Models
{     
    public class ApplicationUser : /*IIdentity, IPrincipal, */IUser 
    {

        //http://benfoster.io/blog/asp-net-identity-role-claims


        public string Id { get; set; }
        public string UserName { get; set; }
        public string[] Roles { get; set; }
        public int DeptSeq { get; set; }



        //public string Name {
        //    get
        //    {
        //        return UserName;
        //    }
        //}
        //public string AuthenticationType {
        //    get
        //    {
        //        return DefaultAuthenticationTypes.ApplicationCookie; 
                
        //    } 
        //}
        //public bool IsAuthenticated {
        //    get
        //    {
        //        return true;
                
        //    } 
        //}
        //public bool IsInRole(string role)
        //{
        //    return  Roles.Contains(role);
        //}

        //public IIdentity Identity {
        //    get { return this; }
        //}
    }
 
}