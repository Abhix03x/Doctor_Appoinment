public class PatientAppointmentDto
{
    public int Id { get; set; }
    public DateTime AppointmentDate { get; set; }
    public string Status { get; set; }
    public string DoctorName { get; set; }
    public string Specialization { get; set; }
}