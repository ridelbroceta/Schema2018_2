using System.Web;
//using ISS.EnterpriseConnect.Helpers;
using System.Web.Mvc;
//using App.BusinessLayer.Repositories;
//using App.UILayer.Business.Common;

namespace App.UILayer.Infrastructure
{
    public interface ILoginService
    {
        void InitializeEnterpriseConnect(ViewDataDictionary viewData);
        //EmployeeInfo GetUserInfo(string authenticationToken);
        //string GetUserMenu(EmployeeInfo info, string baseUrl);
        //User CreateUser(EmployeeInfo info, string menu);
        //void InitializeCache(HttpRequestBase request, User user);
    }

    public class LoginService : ILoginService
    {
        //private readonly Settings settings = Settings.Default;

        //private readonly ISystemConfigRepository _systemConfigRepository;

        public LoginService(/*ISystemConfigRepository systemConfigRepository*/)
        {
            //_systemConfigRepository = systemConfigRepository;
        }

        public void InitializeEnterpriseConnect(ViewDataDictionary viewData)
        {
            //viewData["EnterpriseConnectSecret"] = BuildEnterpriseConnectSecret();
            //viewData["EnterpriseConnectBaseURL"] = _systemConfigRepository.GetConfigValue(SystemConfigKeyValues.EnterpriseConnectBaseUrl);
        }
        //public EmployeeInfo GetUserInfo(string authenticationToken)
        //{
        //    return Methods.ExtractUserInfo(authenticationToken,
        //                    _systemConfigRepository.GetConfigValue(SystemConfigKeyValues.ApplicationKey),
        //                    _systemConfigRepository.GetConfigValue(SystemConfigKeyValues.PrivateKey));
        //}

        //public string GetUserMenu(EmployeeInfo info, string baseUrl)
        //{
        //    var menu = "";

        //    return menu;
        //    //return "<li class='dropdown'><a id='dLabel' class='menusLink' role='button' data-target href='/PRR/Request/Index'>Dashboard</a></li><li class='dropdown'><a id='dLabel' class='menusLink' role='button' data-target href='/PRR/Chart/Index'>Report</a></li><li class='dropdown'><a id='dLabel' class='menusLink' role='button' data-target href='/PRR/CodeTable/Index'>Code Tables</a></li>";
        //}

        //public User CreateUser(EmployeeInfo info, string menu)
        //{
        //    var user = new User(info, menu);
        //    return user;
        //}

        //public void InitializeCache(HttpRequestBase request, User user)
        //{
        //    HttpContext.Current.User = user;
        //    System.Threading.Thread.CurrentPrincipal = user;
        //    request.RequestContext.HttpContext.Cache.Insert("currentPrincipal", user);
        //}

        //private string BuildEnterpriseConnectSecret()
        //{
        //    return HttpUtility.UrlEncode(Methods.GetApplicationSecret(_systemConfigRepository.GetConfigValue(SystemConfigKeyValues.ApplicationKey),
        //                                                                    _systemConfigRepository.GetConfigValue(SystemConfigKeyValues.PrivateKey)));
        //}
    }
}
