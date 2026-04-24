using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using BCrypt.Net;

public class AuthService{
    private readonly UserRepository _repo;
    private readonly JwtHelper _jwt;

    public AuthService(UserRepository repo,JwtHelper jwt)
    {
        _repo = repo;
        _jwt = jwt;
    }

    public async Task<string> Register(RegisterDto dto)
    {
        var existing = await _repo.GetByEmail(dto.Email);
        if(existing!=null )
            return "User already exists";

        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = "Patient"
        };

        await _repo.Create(user);
        return "Registered Successfully";

    }

    public async Task<string> Login(LoginDto dto)
    {
        var user = await _repo.GetByEmail(dto.Email);
        if(user == null || !BCrypt.Net.BCrypt.Verify(dto.Password,user.PasswordHash))
            return "Invalid Credentials";
        return _jwt.GenerateToken(user);
    }
}