using System.Collections.Generic;
using App.BusinessLayer.Contracts.Repositories;
using App.BusinessLayer.Domain;
using App.DataLayer.Contexts;
using App.DataLayer.Core;

namespace App.DataLayer.Repositories
{
    public class EntityTestRepository : GenericRepository, IEntityTestRepository
    {
        public EntityTestRepository(MainDbContext dbContext) : base(dbContext)
        {
        }

        public IEnumerable<EntityTest> GetAllWithInclude()
        {
            throw new System.NotImplementedException();
        }
    }
}
