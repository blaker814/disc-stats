using System;
using System.ComponentModel.DataAnnotations;

namespace DiscStats.Models
{
    public class Shot
    {
        public int Id { get; set; }

        [Required]
        public int ScorecardId { get; set; }

        public Scorecard Scorecard { get; set; }

        [Required]
        public int UserId { get; set; }

        public User User { get; set; }

        [Required]
        public int HoleId { get; set; }

        public Hole Hole { get; set; }

        [Required]
        public int QualityOfShotId { get; set; }

        public QualityOfShot QualityOfShot { get; set; }

        [Required]
        public int DiscId { get; set; }

        public Disc Disc { get; set; }

        [Required]
        public int ShotRangeId { get; set; }

        public ShotRange ShotRange { get; set; }

        [Required]
        public int ShotTypeId { get; set; }

        public ShotType ShotType { get; set; }

        [Required]
        public int ShotSelectionId { get; set; }

        public ShotSelection ShotSelection { get; set; }

        [Required]
        public Boolean IsObstructed { get; set; }
    }
}
