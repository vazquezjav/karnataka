using KarnatakaApis.Connections;
using KarnatakaApis.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KarnatakaApis.Negocio
{
    public class MarginBNegocio
    {
        ConnectionBD _conDB = new ConnectionBD();
        SpendONegocio _so = new SpendONegocio();
        public BalanceModel consultData(int year, int month, string company, string typeVisualization, string typeUnits)
        {
            List<double> present_year = new List<double>();
            BalanceModel balance = new BalanceModel();
            string query = "";
            if (month == 13)
            {
                query = String.Format("select sum(sal_valor_nac) from public.eeff_saldos_ebi_v where sal_tipo=1 and sal_movimiento=1 and sal_periodo={0} and sal_codigo_emp={1} and sal_nivel3='UTILIDAD BRUTA' group by sal_mes;",
                                        year, company);

            }
            else
            {
                if (typeVisualization == "Mes")
                {
                    query = String.Format("select sum(sal_valor_nac) from public.eeff_saldos_ebi_v where sal_tipo=1 and sal_movimiento=1 and sal_periodo={0} and sal_codigo_emp={1} and sal_nivel3='UTILIDAD BRUTA' and sal_mes={2} group by sal_mes;",
                                        year, company, month);
                }
                else
                {
                    query = String.Format("select sum(sal_valor_nac) from public.eeff_saldos_ebi_v where sal_tipo=1 and sal_movimiento=1 and sal_periodo={0} and sal_codigo_emp={1} and sal_nivel3='UTILIDAD BRUTA' and sal_mes between 1 and {2} group by sal_mes;",
                                        year, company, month);
                }
            }
            NpgsqlCommand command = _conDB.connnection3(query);
            using (NpgsqlDataReader reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    present_year.Add(Convert.ToDouble(_so.changeUnits(typeUnits, Convert.ToDouble(reader["sum"]))));
                }
            }
            if (typeVisualization == "Acumulado" && month == 13)
            {
                balance.present_year = _so.cumulative(present_year);
                balance.last_year = _so.cumulative(consultLastYear(year, month, company, typeVisualization, typeUnits));
                balance.presupuest = new List<double>();
            }
            else
            {
                if (typeVisualization =="Mes" && month != 13)
                {
                    balance.present_year = present_year;
                    balance.last_year = consultLastYear(year, month, company, typeVisualization, typeUnits);
                    balance.presupuest = new List<double>();
                }
                else
                {
                    if(typeVisualization =="Acumulado" && month != 13)
                    {
                        balance.present_year = new List<double> { present_year.Sum() };
                        balance.last_year = new List<double> { consultLastYear(year, month, company, typeVisualization, typeUnits).Sum() };
                        balance.presupuest = new List<double>();
                    }
                    else
                    {
                        balance.present_year = present_year;
                        balance.last_year = consultLastYear(year, month, company, typeVisualization, typeUnits);
                        balance.presupuest = new List<double>();
                    }
                }
            }
            return balance;
        }

        public List<double> consultLastYear(int year, int month, string company, string typeVisualization, string typeUnits)
        {
            List<double> present_year = new List<double>();
            String query = "";
            if (month == 13)
            {
                query = String.Format("select sum(sal_valor_nac) from public.eeff_saldos_ebi_v where sal_tipo=1 and sal_movimiento=1 and sal_periodo={0} and sal_codigo_emp={1} and sal_nivel3='UTILIDAD BRUTA' group by sal_mes;",
                                        (year -1), company);

            }
            else
            {
                if (typeVisualization == "Mes")
                {
                    query = String.Format("select sum(sal_valor_nac) from public.eeff_saldos_ebi_v where sal_tipo=1 and sal_movimiento=1 and sal_periodo={0} and sal_codigo_emp={1} and sal_nivel3='UTILIDAD BRUTA' and sal_mes={2} group by sal_mes;",
                                        (year-1), company, month);
                }
                else
                {
                    query = String.Format("select sum(sal_valor_nac) from public.eeff_saldos_ebi_v where sal_tipo=1 and sal_movimiento=1 and sal_periodo={0} and sal_codigo_emp={1} and sal_nivel3='UTILIDAD BRUTA' and sal_mes between 1 and {2} group by sal_mes;",
                                        (year-1), company, month);
                }
            }
            NpgsqlCommand command = _conDB.connnection3(query);
            using (NpgsqlDataReader reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    present_year.Add(Convert.ToDouble(_so.changeUnits(typeUnits, Convert.ToDouble(reader["sum"]))));
                }
            }
            return present_year;
        }
    }
}
