using System.Collections.Generic;

namespace App.BusinessLayer.Contracts.Core
{
    public interface IReadGenericService
    {
        T GetBy<T>(params object[] keyValues) where T : class;

        IEnumerable<T> GetAll<T>() where T : class;
    }
}