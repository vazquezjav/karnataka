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
    public class DataTagsController : ControllerBase
    {
        [HttpGet]
        
        public JsonResult Get()
        {
            DataTagsNegocio dt = new DataTagsNegocio();

            return new JsonResult(dt.consultData());
        }
    }
}
