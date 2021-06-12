using Microsoft.IdentityModel.Tokens;
using System;

namespace wkt_track_backend.Models
{
    public static class TokenLifeTimeValidator
    {
        public static bool Validate(
            DateTime? notBefore,
            DateTime? expires,
            SecurityToken tokenToValidate,
            TokenValidationParameters @param
        )
        {
            return (expires != null && expires > DateTime.UtcNow);
        }
    }
}