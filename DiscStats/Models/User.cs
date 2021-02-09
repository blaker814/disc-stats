using System.ComponentModel.DataAnnotations;

namespace DiscStats.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(200)]
        public string Email { get; set; }

        [Required]
        [MaxLength(28)]
        public string FirebaseUserId { get; set; }
    }
}
