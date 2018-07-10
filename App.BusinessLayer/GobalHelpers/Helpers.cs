using System;
using System.Linq;
using System.Linq.Expressions;

namespace App.BusinessLayer.GobalHelpers
{
    public static class CommonHelper
    {
        public static LambdaExpression CreateExpression(Type type, string propertyName)
        {
            var param = Expression.Parameter(type, "x");

            Expression body = propertyName.Split('.').Aggregate<string, Expression>(param, Expression.PropertyOrField);

            return Expression.Lambda(body, param);
        }

        ///// <summary>
        ///// Performs a shallow convert from the parent to the child object.
        ///// </summary>
        ///// <typeparam name="T"></typeparam>
        ///// <typeparam name="U"></typeparam>
        ///// <param name="parent">The parent.</param>
        ///// <param name="child">The child.</param>
        //public static void ShallowConvert<T, U>(this T parent, U child)
        //{
        //    foreach (PropertyInfo property in parent.GetType().GetProperties())
        //    {
        //        if (property.CanWrite)
        //        {
        //            property.SetValue(child, property.GetValue(parent, null), null);
        //        }
        //    }
        //}

        public static DateTime GetMonday(DateTime time)
        {
            if (time.DayOfWeek != DayOfWeek.Monday)
                return time.Subtract(new TimeSpan((int)time.DayOfWeek - 1, 0, 0, 0));

            return time;
        }

        public static DateTime GetFriday(DateTime time)
        {
            if (time.DayOfWeek != DayOfWeek.Friday)
                return time.Subtract(new TimeSpan((int)time.DayOfWeek - 1, 0, 0, 0));

            return time;
        }
    }


    public class PropertyCopier<TParent, TChild> where TParent : class where TChild : class
    {
        public static void Copy(TParent parent, TChild child)
        {
            var parentProperties = parent.GetType().GetProperties();
            var childProperties = child.GetType().GetProperties();

            foreach (var parentProperty in parentProperties)
            {
                foreach (var childProperty in childProperties)
                {
                    if (parentProperty.Name == childProperty.Name && parentProperty.PropertyType == childProperty.PropertyType)
                    {
                        childProperty.SetValue(child, parentProperty.GetValue(parent));
                        break;
                    }
                }
            }
        }
    }
}
