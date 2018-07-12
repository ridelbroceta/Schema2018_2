using App.BusinessLayer.Contracts.Core;

namespace App.BusinessLayer.Behaviors.Core
{
    public class WriteGenericService : IWriteGenericService
    {
        protected readonly IRepository Repository;

        public WriteGenericService(IRepository repository)
        {
            Repository = repository;
        }

        public void DeleteBy<T>(params object[] keyValues) where T : class
        {
            var unityOfW = Repository.UoW;
            Repository.DeleteBy<T>(keyValues);
            unityOfW.Save();
        }
    }
}