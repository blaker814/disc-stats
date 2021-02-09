using System.ComponentModel.DataAnnotations;

namespace DiscStats.Models
{
    public class QualityOfShot
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Label { get; set; }
    }
}
