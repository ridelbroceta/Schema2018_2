using System.Collections.Generic;

namespace App.BusinessLayer.Contracts.Core
{
    public class ReadGenericService : IReadGenericService
    {
        private readonly IRepository _repository;

        public ReadGenericService(IRepository repository)
        {
            _repository = repository;
        }

        public T GetBy<T>(params object[] keyValues) where T : class
        {
           return _repository.GetBy<T>(keyValues);
        }

        public IEnumerable<T> GetAll<T>() where T : class
        {
            return _repository.GetSet<T>();
        }
    }
}