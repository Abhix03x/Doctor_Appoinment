using Dapper;

public class UserRepository
{
    private readonly DapperContext _context;

    public UserRepository(DapperContext context)
    {
        _context=context;
    }

    public async Task<User> GetByEmail(string email)
    {
        var query = "select * from Users where Email =@Email";
        using var connection = _context.CreateConnection();
        return await connection.QueryFirstOrDefaultAsync<User>(query,new {Email = email});
    }

    public async Task Create(User user)
    {
        var query = @"insert into Users (Name,Email,PasswordHash,Role)
        values (@Name,@Email,@PasswordHash,@Role)";
        using var connection = _context.CreateConnection();
        await connection.ExecuteAsync(query,user); 
    }
}