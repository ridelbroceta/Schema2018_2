using App.BusinessLayer.Contracts.Constraints;
using App.BusinessLayer.Contracts.Core;

namespace App.BusinessLayer.Behaviors.Constraints
{
    public class TestConstraint :ITestConstraint
    {
        private readonly IRepository _repository;

        public TestConstraint(IRepository repository)
        {
            _repository = repository;
        }
    }
}
