using System;
using System.ComponentModel.DataAnnotations;

namespace DiscStats.Models
{
    public class Disc
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        public User User { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        public int Weight { get; set; }

        [MaxLength(50)]
        public string Plastic { get; set; }

        [Required]
        public int DiscTypeId { get; set; }

        public DiscType DiscType { get; set; }

        public Boolean IsActive { get; set; }
    }
}
