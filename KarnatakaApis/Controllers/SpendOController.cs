using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using KarnatakaApis.Negocio;

namespace KarnatakaApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpendOController : ControllerBase
    {

        [HttpGet]
        public JsonResult Get(int year, int month, string company, string typeVisualization, string typeUnits)
        {
            SpendONegocio so = new SpendONegocio();
            return new JsonResult(so.consultData(year, month, company, typeVisualization, typeUnits));
        }
    }
}
