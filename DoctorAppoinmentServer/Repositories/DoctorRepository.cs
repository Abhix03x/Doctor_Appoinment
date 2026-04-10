using Dapper;
public class DoctorRepository
{
    private readonly DapperContext _context;

    public DoctorRepository(DapperContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Doctor>> GetAll()
    {
        var query = "Select * From Doctors";
        using var connection = _context.CreateConnection();
        return await connection.QueryAsync<Doctor>(query);
    }
}