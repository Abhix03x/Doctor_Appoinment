using Dapper;
public class DoctorRepository
{
    private readonly DapperContext _context;

    public DoctorRepository(DapperContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Doctor>> GetAll(string specialization)
    {
        var query = "Select * From Doctors where Specialization = @Specialization";
        using var connection = _context.CreateConnection();
        return await connection.QueryAsync<Doctor>(query,new {Specialization = specialization});
    }

    public async Task<IEnumerable<string>> GetSpec()
    {
        var query = "Select distinct Specialization from Doctors";
        using var connection = _context.CreateConnection();
        return await connection.QueryAsync<string>(query);
    }
}