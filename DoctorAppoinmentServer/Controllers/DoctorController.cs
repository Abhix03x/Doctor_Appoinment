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
    public async Task<IActionResult> Get()
    {
        var doctors = await _service.GetDoctors();
        return Ok(doctors);
    }
}