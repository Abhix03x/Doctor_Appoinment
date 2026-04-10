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
}