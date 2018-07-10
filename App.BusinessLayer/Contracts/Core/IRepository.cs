using System.Collections.Generic;


namespace App.BusinessLayer.Contracts.Core
{
    public interface IRepository
    {
        void Add<T>(T entity) where T : class;

        void AddRange<T>(IEnumerable<T> entities) where T : class;

        void Update<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;

        void DeleteBy<T>(params object[] keyValues) where T : class;

        IEnumerable<T> GetSet<T>() where T : class;

        T GetBy<T>(params object[] keyValues) where T : class;

        void Commit();

    }
}