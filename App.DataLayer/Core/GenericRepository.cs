using System.Collections.Generic;
using System.Data.Entity;
using App.BusinessLayer.Contracts.Core;
using App.DataLayer.Contexts;

namespace App.DataLayer.Core
{
    public class GenericRepository : IRepository
    {
        protected readonly MainDbContext Db;

        public GenericRepository(MainDbContext dbContext)
        {
            //…          //set internal values         
            Db = dbContext;
        }

        public void Add<T>(T entity) where T : class
        {
            Db.Set<T>().Add(entity);
        }

        public void AddRange<T>(IEnumerable<T> entities) where T : class
        {
            Db.Set<T>().AddRange(entities);
        }

        public void Update<T>(T entity) where T : class
        {
            if (Db.Entry(entity).State == EntityState.Detached)
            {
                Db.Set<T>().Attach(entity);
            }
            Db.Entry(entity).State = EntityState.Modified;
        }

        public void Delete<T>(T entity) where T : class
        {
            Db.Set<T>().Remove(entity);
        }

        public void DeleteBy<T>(params object[] keyValues) where T : class
        {
            var entity = Db.Set<T>().Find(keyValues);
            if (entity != null)
                Db.Set<T>().Remove(entity);
        }

        public IEnumerable<T> GetSet<T>() where T : class
        {
            return Db.Set<T>();
        }

        public T GetBy<T>(params object[] keyValues) where T : class
        {
            return Db.Set<T>().Find(keyValues);
        }

        public void Commit()
        {
            Db.SaveChanges();
        }

    }
}
