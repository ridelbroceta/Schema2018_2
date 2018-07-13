using System.Linq;
using App.BusinessLayer.Contracts.Repositories;
using App.BusinessLayer.Domain;
using App.DataLayer.Contexts;
using App.DataLayer.Core;

namespace App.DataLayer.Repositories
{
    public class EntityTestRepository : EntityRepository<EntityTest>, IEntityTestRepository
    {
        public EntityTestRepository(MainDbContext dbContext) : base(dbContext)
        {
        }

        public IQueryable<EntityTest> GetAllByYearInclude(int year)
        {
            throw new System.NotImplementedException();
        }
    }
}
