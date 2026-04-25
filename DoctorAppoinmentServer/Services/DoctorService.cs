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

    public async Task<IEnumerable<Doctor>> GetDoctors()
    {
        return await _repo.Get();
    }

    public async Task<bool> DeleteDoctor(int id)
    {
        var doctor = await _repo.GetById(id);
        if(doctor ==null)
            return false;
        await _repo.Delete(id);
        return true;
    }

    public async Task<ServiceResult> AddDoctor(DoctorDto dto)
    {
        var doctor = new Doctor
        {
            Name = dto.Name,
            Specialization = dto.Specialization,
            AvailableFrom =TimeSpan.Parse(dto.AvailableFrom),
            AvailableTo = TimeSpan.Parse(dto.AvailableTo)
        };

        await _repo.Add(doctor);

        return new ServiceResult
        {
            Success = true,
            Message = "Doctor Added Successfully"
        };
    }
}