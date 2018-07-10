using System.Collections.Generic;
using App.BusinessLayer.Domain;

namespace App.BusinessLayer.Contracts.Repositories
{
    public interface IEntityTestRepository
    {
        IEnumerable<EntityTest> GetAllWithInclude();
    }
}