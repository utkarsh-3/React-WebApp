using System.Collections.Generic;

namespace ClientsApi.Models
{
    public interface IClientRepository<T>
    {
        List<T> Get();
        T Get(string id);
        T Add(T entity);
        T Validate(string fname, string lname, string email);
        void Update(string id,T entity);
        void Delete(string id);
    }
}