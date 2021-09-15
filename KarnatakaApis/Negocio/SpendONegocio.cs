using KarnatakaApis.Connections;
using KarnatakaApis.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KarnatakaApis.Negocio
{
    public class SpendONegocio
    {
        ConnectionBD _conDB = new ConnectionBD();
        public BalanceModel consultData(int year, int month, string company, string typeVisualization, string typeUnits)
        {

            List<double> present_year = new List<double>();
            BalanceModel balance = new BalanceModel();
            String query = "";

            if (month == 13)
            {
                query = String.Format("select sum(sal_valor_nac) from public.eeff_saldos_ebi_v where sal_tipo=1 and sal_periodo={0} and sal_codigo_emp={1} and sal_nivel3='GASTOS OPERACIONALES' group by sal_mes;",
                                        year, company);
            }
            else
            {
                if (month != 13 && typeVisualization == "Mes")
                {
                    query = String.Format("select sum(sal_valor_nac) from public.eeff_saldos_ebi_v where sal_tipo=1 and sal_periodo={0} and sal_codigo_emp={1} and sal_nivel3='GASTOS OPERACIONALES' and sal_mes={2} group by sal_mes;",
                                        year, company, month);
                }
                else
                {
                    query = String.Format("select sum(sal_valor_nac) from public.eeff_saldos_ebi_v where sal_tipo=1 and sal_periodo={0} and sal_codigo_emp={1} and sal_nivel3='GASTOS OPERACIONALES' and sal_mes between 1 and {2} group by sal_mes;",
                                        year, company, month);
                }
                    
            }
            NpgsqlCommand command = _conDB.connnection3(query);
            using (NpgsqlDataReader reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    Console.WriteLine("gasto " + reader["sum"]);
                    present_year.Add(Convert.ToDouble(changeUnits(typeUnits, Convert.ToDouble(reader["sum"]))));
                }
            }
            Console.WriteLine("Datos de legada: " + year + " " + month + " " + company + " type " + typeVisualization + " " + typeUnits + "|| " + query);

            if (typeVisualization == "Acumulado" && month ==13)
            {
                balance.present_year = cumulative(present_year);
                balance.last_year = cumulative(consultLastYear(year, month, company, typeVisualization, typeUnits));
                balance.presupuest = new List<double>();

            }
            else
            {
                if (typeVisualization == "Mes" && month != 13)
                {
                    balance.present_year = present_year;
                    balance.last_year = consultLastYear(year, month, company, typeVisualization, typeUnits);
                    balance.presupuest = new List<double>();
                }
                else
                {
                    if (typeVisualization == "Acumulado" && month != 13)
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
                query = String.Format("select sum(sal_valor_nac) from public.eeff_saldos_ebi_v where sal_tipo=1 and sal_periodo={0} and sal_codigo_emp={1} and sal_nivel3='GASTOS OPERACIONALES' group by sal_mes;",
                                        (year - 1), company);
            }
            else
            {
                if (month != 13 && typeVisualization == "Mes")
                {
                    query = String.Format("select sum(sal_valor_nac) from public.eeff_saldos_ebi_v where sal_tipo=1 and sal_periodo={0} and sal_codigo_emp={1} and sal_nivel3='GASTOS OPERACIONALES' and sal_mes={2} group by sal_mes;",
                                        (year - 1), company, month);
                }
                else
                {
                    query = String.Format("select sum(sal_valor_nac) from public.eeff_saldos_ebi_v where sal_tipo=1 and sal_periodo={0} and sal_codigo_emp={1} and sal_nivel3='GASTOS OPERACIONALES' and sal_mes between 1 and {2} group by sal_mes;",
                                        (year - 1), company, month);
                }
                    
            }

            NpgsqlCommand command = _conDB.connnection3(query);
            using (NpgsqlDataReader reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    //Console.WriteLine(changeUnits(typeUnits, Convert.ToDouble(reader["sum"])));
                    present_year.Add(Convert.ToDouble(changeUnits(typeUnits, Convert.ToDouble(reader["sum"]))));
                }
            }
            return present_year;
        }

        public double changeUnits(string typeUnits, double value)
        {
            if (typeUnits == "Millones")
            {
                return Math.Round((value / 1000000), 2);
            }
            if (typeUnits == "Miles")
            {
                return Math.Round((value / 1000), 2);
            }
            return value;
        }
        public List<double> cumulative(List<double> year)
        {
            double aux = 0;
            List<double> cumulative = new List<double>();
            for (int i = 0; i < year.Count; i++)
            {
                cumulative.Add(year[i] + aux);
                aux = cumulative[i];
                Console.WriteLine("acumulativa " + aux);
            }
            return cumulative;
        }


    }

}
