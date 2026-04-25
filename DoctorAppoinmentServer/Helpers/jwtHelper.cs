using System.IdentityModel.Tokens.Jwt;
using System.Reflection.Metadata;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

public class JwtHelper
{
    private readonly  IConfiguration _config;

    public JwtHelper(IConfiguration config)
    {
        _config = config;
    } 

    public string GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_config["Jwt:Key"])
        );

        var creds = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim("id",user.Id.ToString()),
            new Claim(ClaimTypes.Email,user.Email),
            // new Claim(ClaimTypes.Role,user.Role),
             new Claim("role",user.Role)
        };

        var token = new JwtSecurityToken(
            expires:DateTime.Now.AddHours(2),
            claims:claims,
            signingCredentials:creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}