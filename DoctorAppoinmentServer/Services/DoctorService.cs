public class DoctorService
{
    private readonly DoctorRepository _repo;

    public DoctorService(DoctorRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<Doctor>> GetDoctors()
    {
        return await _repo.GetAll();
    }
}