using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace KarnatakaApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BalanceEController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public BalanceEController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();
            NpgsqlDataReader reader;

            using (NpgsqlConnection connection = new NpgsqlConnection(_configuration.GetConnectionString("KarnatakaAppCon")))
            {
                try
                {
                    connection.Open();
                    using (NpgsqlCommand command = new NpgsqlCommand("select * from public.eeff_saldos_ebi_v limit 15", connection))
                    {
                        reader = command.ExecuteReader();
                        table.Load(reader);

                        reader.Close();
                        connection.Close();
                    }
                }
                catch (Exception)
                {
                    connection.Close();
                }
            }

            return new JsonResult(table);
        }
    }

   
}

