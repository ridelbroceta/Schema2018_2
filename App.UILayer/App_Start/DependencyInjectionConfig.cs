#region licence
// =====================================================
// Example code containing some useful methods that will be pulled out into libraries
// Filename: DependencyInjectionConfig.cs
// Date Created: 2014/10/20
// © Copyright Selective Analytics 2014. All rights reserved
// =====================================================
#endregion

using System.Reflection;
using System.Web.Http;
using System.Web.Mvc;
using App.BusinessLayer;
using App.DataLayer;
using App.UILayer.Business;
using App.UILayer.Infrastructure;
using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using Owin;
//using SPAExample1.Business;
using IContainer = Autofac.IContainer;

namespace App.UILayer
{
    // https://www.strathweb.com/2014/07/dependency-injection-directly-actions-asp-net-web-api/
    //https://www.c-sharpcorner.com/article/using-autofac-with-web-api/
    //http://autofaccn.readthedocs.io/en/latest/integration/webapi.html

    public static class DependencyInjectionConfig
    {
        public static void RegisterDependencyInjection(IAppBuilder appBuilder)
        {
            //This sets up the Autofac container for all levels in the program
            var container = SetupDependencies();

            // Set the dependency resolver for MVC.
            var mvcResolver = new AutofacDependencyResolver(container);
            DependencyResolver.SetResolver(mvcResolver);

            //This allows interfaces etc to be provided as parameters to action methods
            ModelBinders.Binders.DefaultBinder = new DiModelBinder();

            var config = GlobalConfiguration.Configuration;
            //var config = new HttpConfiguration();
            //config.MapHttpAttributeRoutes();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);

            config.InjectInterfacesIntoActions();
            appBuilder.UseWebApi(config);
        }

        private static IContainer SetupDependencies()
        {

            var builder = new ContainerBuilder();
            Load(builder);
            
            ////this is the manager of the components important
           // builder.RegisterAssemblyTypes(typeof(IManager).Assembly).AsImplementedInterfaces();
            
            return builder.Build();
        }

        private static void Load(ContainerBuilder builder)
        {

            //Register your Web API controllers.  
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            //try this for all the contracts in the application
            builder.RegisterControllers(typeof(MvcApplication).Assembly);

            ////this is the manager of the components important
            //builder.RegisterAssemblyTypes(typeof(IManager).Assembly).AsImplementedInterfaces();

            ////Register service layer: autowire all 
            //builder.RegisterAssemblyTypes(GetType().Assembly).AsImplementedInterfaces();

            //and register all the non-generic interfaces interfaces GenericServices assembly
            //builder.RegisterAssemblyTypes(typeof(IFirstTest).Assembly).AsImplementedInterfaces();

            //register the service layer, which then registers all other dependencies in the rest of the system
            builder.RegisterModule(new DataLayerModule());
            builder.RegisterModule(new BusinessLayerModule());


        }

    }


    public class Bootstrapper
    {

        public static void Run()
        {
            //Configure AutoFac  
            AutofacWebapiConfig.Initialize(GlobalConfiguration.Configuration);
        }

    }
}
