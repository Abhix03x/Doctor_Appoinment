public class DoctorService
{
    private readonly DoctorRepository _repo;

    public DoctorService(DoctorRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<Doctor>> GetDoctors(string specialization)
    {
        return await _repo.GetAll(specialization);
    }

    public async Task<IEnumerable<string>> GetSpecialization()
    {
        return await _repo.GetSpec();
    }
}