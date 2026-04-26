using Dapper;
public class PatientRepository
{
     private readonly DapperContext _context;

    public PatientRepository(DapperContext context)
    {
        _context = context;
    }

     public async Task<IEnumerable<User>> Get()
    {
        var query = "Select * From Users where role = @role ";
        using var connection = _context.CreateConnection();
        return await connection.QueryAsync<User>(query,new{role="Patient"});
    }

    public async Task<User> GetById(int id)
    {
        using var connection = _context.CreateConnection();
        return await connection.QueryFirstOrDefaultAsync<User>(
            "Select * from Users where Id = @Id",new{Id=id}
        );
    }

    public async Task Delete(int id)
    {
        using var connection = _context.CreateConnection();
        await connection.ExecuteAsync(
            "Delete from Users where Id = @Id",new{Id=id}
        );
    }
}