

namespace App.UILayer.Business
{
    public interface IFirstTest
    {
        string[] GetValues();
    }

    public class MyFirstTestClass : IFirstTest
    {
        public string[] GetValues()
        {
            return new string[] { "value1", "value2" };
        }
    }
}