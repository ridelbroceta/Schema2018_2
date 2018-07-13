
using App.BusinessLayer.Contracts.Core;
using App.BusinessLayer.Contracts.Repositories;
using App.BusinessLayer.Contracts.WriteServices;
using App.BusinessLayer.Domain;

namespace App.BusinessLayer.Behaviors.WriteServices
{
    class WriteEntityTestService : IWriteEntityTestService
    {
        private readonly IGenericRepository _genericRepository;
        private readonly IUnityOfWork _unityOfWork;
        private readonly IEntityTestRepository _entityTestRepository; 
    

        public WriteEntityTestService(IGenericRepository genericRepository, IEntityTestRepository entityTestRepository)
        {
            _genericRepository = genericRepository;
            _unityOfWork = _genericRepository.UoW;
            _entityTestRepository = entityTestRepository;

        }

        public void Add()
        {
            var entity = new EntityTest();

            _genericRepository.Add(entity);

            _unityOfWork.Save();

            _entityTestRepository.Delete(entity);

            _unityOfWork.Save();

            //
        }

        public int Save(EntityTest entityTest)
        {
            //throw new System.NotImplementedException();
            return 5;
        }
    }
}
