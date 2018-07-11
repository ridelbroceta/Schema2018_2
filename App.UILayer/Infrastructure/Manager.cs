using System;
using System.Web.Mvc;

namespace App.UILayer.Infrastructure
{
    public interface IManager
    {
        T Resolve<T>();
    }

    public class Manager : IManager
    {

        public T Resolve<T>() 
        {
            if (typeof (T).IsInterface)
            {
                /*var isCreated = _objects.ContainsKey(typeof (T));
                var obj = isCreated ?_objects[typeof(T)] : DependencyResolver.Current.GetService(typeof(T));
                if (!isCreated) _objects[typeof (T)] = obj;
                return (T)obj;*/
                return (T)DependencyResolver.Current.GetService(typeof (T));
            }
            throw new ApplicationException("It is not a interface");
        }
    }
}
