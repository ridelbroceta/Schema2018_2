using System.Linq;
using App.BusinessLayer.Contracts.Core;
using App.BusinessLayer.Domain;

namespace App.BusinessLayer.Contracts.Repositories
{
    public interface IEntityTestRepository : IEntityRepository<EntityTest>
    {
        //all the Include have to take something to do where and return IQueryable<T>
        IQueryable<EntityTest> GetAllByYearInclude(/*paramenters*/ int year);
    }
}