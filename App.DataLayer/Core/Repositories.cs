﻿using System.Collections.Generic;
using System.Data.Entity;
using App.BusinessLayer.Contracts.Core;
using App.DataLayer.Contexts;

namespace App.DataLayer.Core
{

    public abstract class RootRepository
    {
        protected readonly MainDbContext Db;

        protected RootRepository(MainDbContext dbContext)
        {
            //…          //set internal values         
            Db = dbContext;
        }

        public IUnityOfWork UoW
        {
            get { return Db as IUnityOfWork; }
        }
    }

    public abstract class EntityRepository<T> : RootRepository, IEntityRepository<T> where T : class 
    {
        public void Add(T entity)
        {
            Db.Set<T>().Add(entity);
        }

        public void AddRange(IEnumerable<T> entities)
        {
            Db.Set<T>().AddRange(entities);
        }

        public void Update(T entity)
        {
            if (Db.Entry(entity).State == EntityState.Detached)
            {
                Db.Set<T>().Attach(entity);
            }
            Db.Entry(entity).State = EntityState.Modified;
        }

        public void Update(ICollection<T> entities)
        {
            foreach (var item in entities)
            {
                if (Db.Entry(item).State == EntityState.Detached)
                {
                    Db.Set<T>().Attach(item);
                }
                Db.Entry(item).State = EntityState.Modified;

            }
        }

        public void Delete(T entity)
        {
            Db.Set<T>().Remove(entity);
        }

        public void DeleteBy(params object[] keyValues)
        {
            var entity = Db.Set<T>().Find(keyValues);
            if (entity != null)
                Db.Set<T>().Remove(entity);
        }

        public IEnumerable<T> GetSet()
        {
            return Db.Set<T>();
        }

        public T GetBy(params object[] keyValues) 
        {
            return Db.Set<T>().Find(keyValues);
        }

        protected EntityRepository(MainDbContext dbContext) : base(dbContext)
        {
        }
    }

    public sealed class GenericRepository : RootRepository, IGenericRepository
    {
       
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

        public void Update<T>(ICollection<T> entities) where T : class
        {
            foreach (var item in entities)
            {
                if (Db.Entry(item).State == EntityState.Detached)
                {
                    Db.Set<T>().Attach(item);
                }
                Db.Entry(item).State = EntityState.Modified;

            }
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

        //public void Commit()  //Wrong
        //{
        //    Db.SaveChanges();
        //}

        public GenericRepository(MainDbContext dbContext) : base(dbContext)
        {
        }
    }
}
