using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using wkt_track_backend.Data;
using wkt_track_backend.Models;

namespace wkt_track_backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly WktDbContext _ctx;

        public UserController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager, IConfiguration configuration, WktDbContext ctx)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _configuration = configuration;
            _ctx = ctx;
        }

        [HttpPost]
        public async Task<object> Register([FromBody] RegisterDto model)
        {
            var user = new IdentityUser
            {
                UserName = model.Username,
                Email = model.Email,
            };
            var userCreateResult = await _userManager.CreateAsync(user, model.Password);

            if (!userCreateResult.Succeeded)
            {
                return BadRequest(userCreateResult.Errors.First().Description);
            }

            await _signInManager.SignInAsync(user, false);
            await _userManager.AddToRoleAsync(user, "Basic User");
            return Ok("Creation of User is a success");
        }

        [HttpPost]
        public async Task<object> Login([FromBody] LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            var result = await _signInManager.PasswordSignInAsync(user.UserName, model.Password, false, false);

            if (!result.Succeeded)
            {
                return Unauthorized("The username or password is incorrect");
            }

            var appUser = _userManager.Users.SingleOrDefault(user => user.Email == model.Email);
            var refreshToken = GenerateRefreshToken();
            Response.Cookies.Append(
                "refresh-token",
                refreshToken,
                new CookieOptions
                {
                    HttpOnly = true,
                    SameSite = SameSiteMode.None,
                    Secure = true,
                });
            await _ctx.RefreshTokens.AddAsync(new RefreshToken
            {
                Token = refreshToken,
                ValidUntil = DateTime.Now.AddDays(7),
                UserId = appUser?.Id
            });
            await _ctx.SaveChangesAsync();
            return await GenerateJwt(appUser);
        }

        [HttpPost]
        public async Task<object> RefreshToken()
        {
            var receivedRefreshToken = Request.Cookies["refresh-token"];
            if (receivedRefreshToken == null) return BadRequest("No Refresh Token");

            var storedRefreshToken = _ctx.RefreshTokens.First(rft => rft.Token== receivedRefreshToken);
            if (storedRefreshToken.ValidUntil <= DateTime.Now) return BadRequest("Refresh Token Expired");

            var newRefreshToken = GenerateRefreshToken();
            var appUser = await _userManager.FindByIdAsync(storedRefreshToken.UserId);
            _ctx.RefreshTokens.Remove(storedRefreshToken);
            Response.Cookies.Append(
                "refresh-token",
                newRefreshToken,
                new CookieOptions
                {
                    HttpOnly = true,
                    SameSite = SameSiteMode.None,
                    Secure = true,
                });
            await _ctx.RefreshTokens.AddAsync(new RefreshToken
            {
                Token = newRefreshToken,
                ValidUntil = DateTime.Now.AddDays(7),
                UserId = appUser.Id
            });
            
            await _ctx.SaveChangesAsync();
            return await GenerateJwt(appUser);
        }

        private async Task<object> GenerateJwt(IdentityUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.GivenName, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_TOKEN_SECRET_KEY") ?? throw new InvalidOperationException()));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var issuer = _configuration["JwtToken:Issuer"];
            var audience = _configuration["JwtToken:Issuer"];
            var jwtValidity = DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["JwtToken:TokenExpiry"]));

            var claimsIdentity = new ClaimsIdentity(claims, "Token");
            claimsIdentity.AddClaims(roles.Select(role => new Claim("Roles", role)));

            var token = new JwtSecurityToken(
                issuer,
                audience,
                claimsIdentity.Claims,
                expires: jwtValidity,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private static string GenerateRefreshToken()
        {
            var rand = new Random();

            const string pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789+.";
            var refreshToken = new char[32];
            for (int i = 0; i < 32; i++)
            {
                refreshToken[i] = pool[rand.Next(pool.Length)];
            }

            return new string(refreshToken);
        }
    }

    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        [StringLength(30, ErrorMessage = "Password minimal length must be 6", MinimumLength = 6)]
        public string Password { get; set; }
    }

    public class LoginDto
    {
         [Required]
         public string Email { get; set; }
         [Required]
         public string Password { get; set; }
    }
}