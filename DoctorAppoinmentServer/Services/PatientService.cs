public class PatientService
{
    private readonly PatientRepository _repo;

    public PatientService(PatientRepository repo)
    {
        _repo=repo;
    }

     public async Task<IEnumerable<User>> GetAll()
    {
        return await _repo.Get();
    }

    public async Task<bool> DeletePatient(int id)
    {
        var patient = await _repo.GetById(id);
        if(patient ==null)
            return false;
        await _repo.Delete(id);
        return true;
    }

}