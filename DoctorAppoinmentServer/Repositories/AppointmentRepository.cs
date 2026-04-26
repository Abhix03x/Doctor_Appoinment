using Dapper;

public class AppointmentRepository
{
    private readonly DapperContext _context;

    public AppointmentRepository(DapperContext context)
    {
        _context = context;
    }

    public async Task Create(AppointmentDto dto)
    {
        var query = @"Insert into Appointments
        (PatientId, DoctorId,AppointmentDate,Status) 
        values (@PatientId,@DoctorId,@AppointmentDate,'pending')";

        using var connection = _context.CreateConnection();
        await connection.ExecuteAsync(query,dto);
    }

    public async Task<bool> IsSlotTaken(int doctorId,DateTime date)
    {
        var query =@"Select COUNT(*) from Appointments 
        where DoctorId = @DoctorId
        and AppointmentDate = @Date";

        using var connection = _context.CreateConnection();
        var count = await connection.ExecuteScalarAsync<int>(query,new
        {
            DoctorId=doctorId,
            Date = date
        }) ;

        return count>0;
    }

    public async Task<IEnumerable<AppointmentResponseDto>> GetAll()
    {
        var query = @"
        select a.id ,a.AppointmentDate,a.Status,u.Name as PatientName,d.Name as DoctorName 
        from Appointments a JOIN Users u ON a.PatientId = u.Id
        JOIN Doctors d ON a.DoctorId = d.Id";
        using var connection = _context.CreateConnection();
        return await connection.QueryAsync<AppointmentResponseDto>(query);
    }

    public async Task<Appointment> GetById(int id)
    {
        using var connection = _context.CreateConnection();
        return await connection.QueryFirstOrDefaultAsync<Appointment>(
            "Select * from Appointments where Id = @Id",new{Id=id}
        );
    }

    public async Task UpdateStatus(int id,string status)
    {
        using var connection = _context.CreateConnection();
        await connection.ExecuteAsync(
            "Update Appointments set Status = @Status where Id = @Id ",new{Status = status,Id=id}
        );
    }

    public async Task Delete(int id)
    {
         using var connection = _context.CreateConnection();
        await connection.ExecuteAsync(
            "Delete from Appointments where Id = @Id ",new{Id=id}
        );
    }

    public async Task<IEnumerable<Appointment>> Pending()
    {
        using var connection = _context.CreateConnection();
        return await connection.QueryAsync<Appointment>(
            "Select * from Appointments Where Status = @status",new{status ="pending"}
        );
    }
}