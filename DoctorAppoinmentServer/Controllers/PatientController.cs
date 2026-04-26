using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

[Authorize(Roles="Admin") ]
[ApiController]
[Route("api/[controller]")]

public class PatientController : ControllerBase
{
    private readonly PatientService _service;

    public PatientController(PatientService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var patient = await _service.GetAll();
        return Ok(patient);
    }

     [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePatient(int id)
    {
        var result = await _service.DeletePatient(id);
        if (!result)
        {
            return NotFound("Patient not found");
        }
        return Ok("Patient deleted Successfully");
    }
}
