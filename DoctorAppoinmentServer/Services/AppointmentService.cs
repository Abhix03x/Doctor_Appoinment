
public class AppointmentService
{
    private readonly AppointmentRepository _repo;

    public AppointmentService(AppointmentRepository repo)
    {
        _repo=repo;
    }

    public async Task<string> BookAppointment(AppointmentDto dto)
    {
        if(dto.AppointmentDate<DateTime.Now)
            return "Cannot Book past appointments";
        var exists = await _repo.IsSlotTaken(dto.DoctorId,dto.AppointmentDate);
        if (exists)
            return "This slot is already booked";
        await _repo.Create(dto);

        return "Appointment booked Successfully";
    }
}