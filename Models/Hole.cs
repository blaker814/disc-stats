using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiscStats.Models
{
    [Table("hole")]
    public class Hole
    {
        public int Id { get; set; }

        [Required]
        public int Number { get; set; }

        [Required]
        public int Par { get; set; }

        [Required]
        public int Distance { get; set; }

        [Required]
        public int CourseId { get; set; }

        public Course Course { get; set; }
    }
}
