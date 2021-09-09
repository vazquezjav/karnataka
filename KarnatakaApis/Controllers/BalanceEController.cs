using KarnatakaApis.Connections;
using KarnatakaApis.Negocio;
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

        [HttpGet]
        public JsonResult Get(int year, int month, string company)
        {
            BalanceENegocio be = new BalanceENegocio();
            return new JsonResult(be.consultData(year, month, company));
        }

    }


}

