using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

JwtSecurityTokenHandler.DefaultOutboundClaimTypeMap.Clear();
JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
 {
     var key =  new SymmetricSecurityKey(
         Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? "")
     );
     options.TokenValidationParameters = new TokenValidationParameters
     {
         ValidateIssuerSigningKey = true, 
         IssuerSigningKey = key,
         ValidateIssuer = false,
         ValidateAudience = false,
         //for role based login for admin
         RoleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
     };
 });

 builder.Services.AddCors(options =>
 {
     options.AddPolicy("AllowAll",
        policy => policy
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod());
 });
// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddScoped<DapperContext>();
builder.Services.AddScoped<DoctorRepository>();
builder.Services.AddScoped<DoctorService>();
builder.Services.AddScoped<AppointmentRepository>();
builder.Services.AddScoped<AppointmentService>();
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<JwtHelper>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}


app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();




app.Run();
 
