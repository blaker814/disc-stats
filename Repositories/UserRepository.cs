using DiscStats.Data;
using DiscStats.Models;
using System.Linq;

namespace DiscStats.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public User GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.User.FirstOrDefault(u => u.FirebaseUserId == firebaseUserId);

        }

        public User GetById(int id)
        {
            return _context.User
                .FirstOrDefault(up => up.Id == id);
        }

        public void Add(User user)
        {
            _context.Add(user);
            _context.SaveChanges();
        }
    }
}