using System;
using System.Web.Http;
using System.Web.Http.Controllers;


namespace App.VerticalLayer.Infrastructure
{
    [AttributeUsage(AttributeTargets.Parameter)]
    public class InjectAttribute : ParameterBindingAttribute
    {
        public override HttpParameterBinding GetBinding(HttpParameterDescriptor parameter)
        {
            return new InjectParameterBinding(parameter);
        }
    }
}
