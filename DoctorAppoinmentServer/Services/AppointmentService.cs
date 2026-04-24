
public class AppointmentService
{
    private readonly AppointmentRepository _repo;

    public AppointmentService(AppointmentRepository repo)
    {
        _repo=repo;
    }

    public async Task<string> BookAppointment(AppointmentDto dto)
    {
        if(dto.AppointmentDate<DateTime.Now){
            return BadRequest(new { message="Cannot Book past appointments"});
        }
        var exists = await _repo.IsSlotTaken(dto.DoctorId,dto.AppointmentDate);
        if (exists)
        {
            return Conflict(new {message ="This slot is already booked" }) ;
        }  
        await _repo.Create(dto);

        return Ok("Appointment booked Successfully");
    }
}