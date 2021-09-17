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
    public class MarginOController : ControllerBase
    {
        [HttpGet]
        public JsonResult Get(int year, int month, string company, string typeVisualization, string typeUnits, string typeGraph)
        {
            MarginONegocio mo = new MarginONegocio();
            return new JsonResult(mo.consultData(year, month, company, typeVisualization, typeUnits, typeGraph));
        }
    }
}
