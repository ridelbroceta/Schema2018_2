using System.Web.Http;


namespace App.VerticalLayer.Infrastructure
{
    public static class HttpConfigurationExtensions
    {
        public static void InjectInterfacesIntoActions(this HttpConfiguration config)
        {
            config.ParameterBindingRules.Insert(0, param =>
            {
                if (param.ParameterType.IsInterface)
                {
                    return new InjectParameterBinding(param);
                }

                return null;
            });
        }
    }
}