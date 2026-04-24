using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

[Authorize]
[ApiController]
[Route("api/[controller]")]

public class AppointmentController : ControllerBase
{
    private readonly AppointmentService _service;

    public AppointmentController(AppointmentService service)
    {
        _service=service;
    }

    // [Authorize]
    [HttpPost("book")]
    public async Task<IActionResult> Book(AppointmentDto dto)
    {
        var result = await _service.BookAppointment(dto);
        if(result.Contains("Cannot")||result.Contains("already"))
            return BadRequest(result);
        return Ok(result);
    }

}