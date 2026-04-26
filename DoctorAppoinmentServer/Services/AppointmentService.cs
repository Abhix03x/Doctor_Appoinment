
public class AppointmentService
{
    private readonly AppointmentRepository _repo;

    public AppointmentService(AppointmentRepository repo)
    {
        _repo=repo;
    }

    public async Task<ServiceResult> BookAppointment(AppointmentDto dto)
    {
        if(dto.AppointmentDate<DateTime.Now){
            return new ServiceResult
            {
                Success = false,
                Message = "Cannot Book past appointments"
            };
        }
        var exists = await _repo.IsSlotTaken(dto.DoctorId,dto.AppointmentDate);
        if (exists)
        {
            return new ServiceResult
            {
                Success = false,
                Message = "This slot is already booked"
            };
        }  
        await _repo.Create(dto);

        return new ServiceResult
            {
                Success = true,
                Message = "Appointment booked Successfully"
            };
    }
    public async Task<IEnumerable<AppointmentResponseDto>> GetAppointment()
    {
        return await _repo.GetAll();
    }

    public async Task<bool> UpdateStatus(int id,string status)
    {
        var appointment = await _repo.GetById(id);
        if(appointment==null) return false;
        await _repo.UpdateStatus(id,status);
        return true;
    }

    public async Task<bool> DeleteAppointment(int id)
    {
        var appointment = await _repo.GetById(id);
        if(appointment==null)
            return false;
        await  _repo.Delete(id);
        return true;
    }

    public async Task<IEnumerable<Appointment>> GetPending()
    {
        return await _repo.Pending();
    }
}