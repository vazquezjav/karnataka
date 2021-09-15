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
    public class BalanceController : ControllerBase
    {
        [HttpGet]
        public JsonResult Get(int year, int month, string company, string typeVisualization, string typeUnits)
        {
            BalanceNegocio be = new BalanceNegocio();
            return new JsonResult(be.consultData2(year, month, company, typeVisualization, typeUnits));
        }
    }
}
