using System.Collections.Generic;


namespace App.BusinessLayer.Contracts.Core
{

    public interface IEntityRepository<T> where T : class
    {
        void Add(T entity);

        void AddRange(IEnumerable<T> entities);

        void Update(T entity);

        void Update(ICollection<T> entities);

        void Delete(T entity);

        void DeleteBy(params object[] keyValues);

        IEnumerable<T> GetSet();

        T GetBy(params object[] keyValues);

        IUnityOfWork UoW { get; }

    }

    public interface IGenericRepository
    {
        void Add<T>(T entity) where T : class;

        void AddRange<T>(IEnumerable<T> entities) where T : class;

        void Update<T>(T entity) where T : class;

        void Update<T>(ICollection<T> entities) where T : class;

        void Delete<T>(T entity) where T : class;

        void DeleteBy<T>(params object[] keyValues) where T : class;

        IEnumerable<T> GetSet<T>() where T : class;

        T GetBy<T>(params object[] keyValues) where T : class;

        // void Commit(); Wrong

        IUnityOfWork UoW { get; }

    }
}