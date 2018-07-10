using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(App.UILayer.Startup))]
namespace App.UILayer
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            DependencyInjectionConfig.RegisterDependencyInjection(app);
        }
    }
}
