using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]

public class DoctorController : ControllerBase
{
    private readonly DoctorService _service;

    public DoctorController(DoctorService service)
    {
        _service= service;
    }

    [HttpGet]
    public async Task<IActionResult> Get(string specialization)
    {
        var doctors = await _service.GetDoctors(specialization);
        Console.WriteLine( specialization);
        return Ok(doctors);
    }
    [HttpGet("specialization")]
    public async Task<IActionResult> Specialization()
    {
        var specialization = await _service.GetSpecialization();
        return Ok(specialization);
    }
}