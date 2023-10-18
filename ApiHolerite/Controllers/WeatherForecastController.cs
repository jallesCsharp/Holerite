using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiHolerite.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        //Tamanho do Banco
        //[HttpGet]
        //public IActionResult GetSizeBanco()
        //{
        //    //SELECT
        //    //    pg_database.datname, 
        //    //    pg_size_pretty(pg_database_size(pg_database.datname)) AS size
        //    //FROM pg_database;
        //}

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            //SELECT
            //    pg_database.datname, 
            //    pg_size_pretty(pg_database_size(pg_database.datname)) AS size
            //FROM pg_database;
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
