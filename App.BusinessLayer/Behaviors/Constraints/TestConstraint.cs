using App.BusinessLayer.Contracts.Constraints;
using App.BusinessLayer.Contracts.Core;

namespace App.BusinessLayer.Behaviors.Constraints
{
    public class TestConstraint :ITestConstraint
    {
        private readonly IGenericRepository _genericRepository;

        public TestConstraint(IGenericRepository genericRepository)
        {
            _genericRepository = genericRepository;
        }
    }
}
