using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace wkt_track_backend.Models
{
    [Table("RefreshTokens")]
    public class RefreshToken
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(TypeName = "text")]
        [Key]
        public string Token { get; set; }
        
        [Column(TypeName = "timestamp")]
        public DateTime ValidUntil { get; set; }
        
        public string UserId { get; set; }
        [ForeignKey("user_id")]
        public IdentityUser User { get; set; }
    }
}