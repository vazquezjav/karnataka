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
    public class IndicatorVController : ControllerBase
    {

        [HttpGet]
        public JsonResult Get()
        {

            IndicatorVNegocio iv = new IndicatorVNegocio();

            return new JsonResult(iv.consultData());
        }
                
    }
}
