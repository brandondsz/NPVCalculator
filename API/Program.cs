using Application.UseCases.CalculateNpv;
using Domain.Interfaces;
using Domain.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();



builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

// DI bindings
builder.Services.AddScoped<INpvCalculator, NpvCalculator>();
builder.Services.AddScoped<CalculateNpvHandler>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});



var app = builder.Build();

app.UseCors("AllowAll");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    
}

app.UseHttpsRedirection();



//app.UseSwagger();
//app.UseSwaggerUI();
app.MapControllers();

app.Run();
