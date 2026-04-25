using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;


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
        return Ok(doctors);
    }
    [HttpGet("specialization")]
    public async Task<IActionResult> Specialization()
    {
        var specialization = await _service.GetSpecialization();
        return Ok(specialization);
    }

    [HttpGet("all")]
    [Authorize(Roles ="Admin")]
    public async Task<IActionResult> GetAll()
    {
        var doctors = await _service.GetDoctors();
        return Ok(doctors);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles="Admin")]
    public async Task<IActionResult> DeleteDoctor(int id)
    {
        var result = await _service.DeleteDoctor(id);
        if (!result)
        {
            return NotFound("Doctor not found");
        }
        return Ok("Doctor deleted Successfully");
    }

    [HttpPost]
    [Authorize(Roles="Admin")]
    public async Task<IActionResult> AddDoctor(DoctorDto dto)
    {
        var result = await _service.AddDoctor(dto);
        return Ok(new {message = result.Message});
    }

    
}