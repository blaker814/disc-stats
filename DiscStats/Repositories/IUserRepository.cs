using DiscStats.Models;

namespace DiscStats.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);
        User GetByFirebaseUserId(string firebaseUserId);
        User GetById(int id);
    }
}