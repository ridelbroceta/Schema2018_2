using System.Collections.Generic;
using App.BusinessLayer.Domain;

namespace App.BusinessLayer.Contracts.ReadServices
{
    public interface IReadEntityTestService
    {
        IEnumerable<EntityTest> GetAll();
        IEnumerable<EntityTest> GetComplexQuery(int year);
        IEnumerable<EntityTest> GetAllActive();
        EntityTest GetMyEntityTest(int seq);
    }
}