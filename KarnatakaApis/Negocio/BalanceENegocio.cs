using KarnatakaApis.Connections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace KarnatakaApis.Negocio
{
    public class BalanceENegocio
    {
        public DataTable consultData(int year, int month, string company)
        {
            ConnectionBD con = new ConnectionBD();
            string query;
            if(month == 13)
            {
                 query = String.Format("select * from public.eeff_saldos_ebi_v where sal_periodo={0} and sal_nombre_emp='{1}';",
                                        year, company);
            }
            else
            {
                query = String.Format("select * from public.eeff_saldos_ebi_v where sal_periodo={0} and sal_mes={1} and sal_nombre_emp='{2}';",
                                        year, month, company);
            }
            Console.WriteLine("Datos de legada: " + year +" "+ month + " "+company+" || "+query);

            return con.connection(query);
        }

    }
}
