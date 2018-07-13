using System.Collections.Generic;
using System.Linq;
using App.BusinessLayer.Contracts.Core;
using App.BusinessLayer.Contracts.ReadServices;
using App.BusinessLayer.Contracts.Repositories;
using App.BusinessLayer.Domain;

namespace App.BusinessLayer.Behaviors.ReadServices
{
    public class ReadEntityTestService : IReadEntityTestService 
    {
        private readonly IGenericRepository _genericRepository;
        private readonly IEntityTestRepository _entityTestRepository;


        public ReadEntityTestService(IGenericRepository genericRepository, IEntityTestRepository entityTestRepository)
        {
            _genericRepository = genericRepository;
            _entityTestRepository = entityTestRepository;

        }

        public IEnumerable<EntityTest> GetAll()
        {
            return _genericRepository.GetSet<EntityTest>().Where(p => p.DueDate == null);
        }

        public IEnumerable<EntityTest> GetComplexQuery(int year)
        {
            var result = _entityTestRepository.GetAllByYearInclude(year).Where(p => p.EntityTestSeq == 5).AsEnumerable();
            return result;
        }

        public IEnumerable<EntityTest> GetAllActive()
        {
            //you have to add startDate and endDate
            return _genericRepository.GetSet<EntityTest>().Where(p => (p.DueDate == null) /*//you have to add startDate and endDate*/);
        }

        public EntityTest GetMyEntityTest(int seq)
        {
            return new EntityTest()
            {
                EntityTestSeq = 1,
                Description = "Test",
            };
        }
    }
}
