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
        if (!result.Success)
        {
            return BadRequest(new{message= result.Message});
        }
        return Ok(new {message = result.Message});
    }

    [HttpGet]
    [Authorize(Roles="Admin")]
    public async Task<IActionResult> GetAppointments()
    {
        var appointments =await _service.GetAppointment();
        return Ok(appointments);
    }

    [HttpPut("{id}/status")]
    [Authorize(Roles="Admin")]
    public async Task<IActionResult> UpdateStatus(int id,StatusDto dto)
    {
        var result = await _service.UpdateStatus(id,dto.Status);
        if(!result)
            return NotFound("Appointment Not found");
        return Ok("Status Updated");
    }

    [HttpDelete("{id}")]
    [Authorize(Roles="Admin")]
    public async Task<IActionResult> DeleteAppointment(int id)
    {
        var result = await _service.DeleteAppointment(id);
        if(!result)
            return NotFound("No Appointment");
        return Ok("Appointment Deleted");
    }

    [HttpGet("pending")]
    [Authorize(Roles="Admin")]

    public async Task<IActionResult> GetPending()
    {
        var pending = await _service.GetPending();
        return Ok(pending);
    }
}