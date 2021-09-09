using KarnatakaApis.Connections;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace KarnatakaApis.Negocio
{
    public class IndicatorVNegocio
    {

        public DataTable consultData()
        {
            ConnectionBD con = new ConnectionBD();

            return con.connection("select * from public.eeff_valor_indicador_v limit 15");
        }
    }
}
