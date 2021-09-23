using KarnatakaApis.Negocio;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KarnatakaApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsolidatedController : ControllerBase
    {

        [HttpGet]
        public JsonResult Get(int year, int month, string company, string typeVisualization, string typeUnits, string typeGraph)
        {
            ConsolidatedNegocio co = new ConsolidatedNegocio();
            return new JsonResult(co.consultData(year, month, company, typeVisualization, typeUnits, typeGraph));
        }

    }
}
