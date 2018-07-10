using App.BusinessLayer.Contracts.Core;

namespace App.BusinessLayer.Behaviors.Core
{
    public class WriteGenericService : IWriteGenericService
    {
        private readonly IRepository _repository;

        public WriteGenericService(IRepository repository)
        {
            _repository = repository;
        }

        public void DeleteBy<T>(params object[] keyValues) where T : class
        {
            _repository.DeleteBy<T>(keyValues);
            _repository.Commit();
        }
    }
}