
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
}