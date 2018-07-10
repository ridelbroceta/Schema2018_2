#region licence
// =====================================================
// Example code containing some useful methods that will be pulled out into libraries
// Filename: DataLayerModule.cs
// Date Created: 2014/10/20
// © Copyright Selective Analytics 2014. All rights reserved
// =====================================================
#endregion

using Autofac;

namespace App.BusinessLayer
{

    public class BusinessLayerModule : Module
    {

        protected override void Load(ContainerBuilder builder)
        {
            //Now register the DataLayer
            //builder.RegisterModule(new DataLayerModule());

            //Reigister the BizLayer
            //builder.RegisterModule(new BizLayerModule());

            //---------------------------
            //Register service layer: autowire all 
            builder.RegisterAssemblyTypes(GetType().Assembly).AsImplementedInterfaces();

            //and register all the non-generic interfaces interfaces GenericServices assembly
            //builder.RegisterAssemblyTypes(typeof(IEntityRepository).Assembly).AsImplementedInterfaces();
            //builder.RegisterAssemblyTypes(typeof(IUnityOfWork).Assembly).AsImplementedInterfaces();
        }
    }

}
