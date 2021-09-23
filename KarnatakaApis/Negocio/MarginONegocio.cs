using KarnatakaApis.Connections;
using KarnatakaApis.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KarnatakaApis.Negocio
{
    public class MarginONegocio
    {
        ConnectionBD _conDB = new ConnectionBD();
        SpendONegocio _so = new SpendONegocio();
        
        public BalanceModel consultData(int year, int month, string company, string typeVisualization, string typeUnits, string typeGraph)
        {
            List<double> present_year = new List<double>();
            BalanceModel balance = new BalanceModel();
            string query = "";

            if(typeGraph =="GASTOS OPERACIONALES")
            {
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
            }
            else
            {
                if (month == 13)
                {
                    query = String.Format("select sum(sal_valor_nac) from public.eeff_saldos_ebi_v where sal_tipo=1 and sal_movimiento=1 and sal_periodo={0} and sal_codigo_emp={1} and sal_nivel3='{2}' group by sal_mes;",
                                            year, company, typeGraph);

                }
                else
                {
                    if (typeVisualization == "Mes")
                    {
                        query = String.Format("select sum(sal_valor_nac) from public.eeff_saldos_ebi_v where sal_tipo=1 and sal_movimiento=1 and sal_periodo={0} and sal_codigo_emp={1} and sal_nivel3='{2}' and sal_mes={3} group by sal_mes;",
                                            year, company, typeGraph, month);
                    }
                    else
                    {
                        query = String.Format("select sum(sal_valor_nac) from public.eeff_saldos_ebi_v where sal_tipo=1 and sal_movimiento=1 and sal_periodo={0} and sal_codigo_emp={1} and sal_nivel3='{2}' and sal_mes between 1 and {3} group by sal_mes;",
                                            year, company, typeGraph, month);
                    }
                }
            }


            var tuple = _conDB.connnection2(query);

            using (NpgsqlDataReader reader = tuple.Item1.ExecuteReader())
            {
                while (reader.Read())
                {
                    present_year.Add(Convert.ToDouble(_so.changeUnits(typeUnits, Convert.ToDouble(reader["sum"]))));
                }
                tuple.Item2.Close();
                
            }

            if (typeVisualization == "Acumulado" && month == 13)
            {
                balance.present_year = _so.cumulative(present_year);
                balance.last_year = _so.cumulative(consultLastYear(year, month, company, typeVisualization, typeUnits, typeGraph));
                balance.presupuest = _so.cumulative(consultPresupuest(year, month, company, typeVisualization, typeUnits, typeGraph));
            }
            else
            {
                if (typeVisualization == "Mes" && month != 13)
                {
                    balance.present_year = present_year;
                    balance.last_year = consultLastYear(year, month, company, typeVisualization, typeUnits, typeGraph);
                    balance.presupuest = consultPresupuest(year, month, company, typeVisualization, typeUnits, typeGraph);
                }
                else
                {
                    if (typeVisualization == "Acumulado" && month != 13)
                    {
                        balance.present_year = new List<double> { present_year.Sum() };
                        balance.last_year = new List<double> { consultLastYear(year, month, company, typeVisualization, typeUnits, typeGraph).Sum() };
                        balance.presupuest = new List<double> { consultPresupuest(year, month, company, typeVisualization, typeUnits, typeGraph).Sum() };
                    }
                    else
                    {
                        balance.present_year = present_year;
                        balance.last_year = consultLastYear(year, month, company, typeVisualization, typeUnits, typeGraph);
                        balance.presupuest = consultPresupuest(year, month, company, typeVisualization, typeUnits, typeGraph);
                    }
                }
            }
            
            return balance;
        }
        public List<double> consultLastYear(int year, int month, string company, string typeVisualization, string typeUnits, string typeGraph)
        {
            List<double> last_year = new List<double>();
            String query = "";
            if(typeGraph =="GASTOS OPERACIONALES")
            {
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
            }
            else
            {
                if (month == 13)
                {
                    query = String.Format("select sum(sal_valor_nac) from public.eeff_saldos_ebi_v where sal_tipo=1 and sal_movimiento=1 and sal_periodo={0} and sal_codigo_emp={1} and sal_nivel3='{2}' group by sal_mes;",
                                            (year - 1), company, typeGraph);

                }
                else
                {
                    if (typeVisualization == "Mes")
                    {
                        query = String.Format("select sum(sal_valor_nac) from public.eeff_saldos_ebi_v where sal_tipo=1 and sal_movimiento=1 and sal_periodo={0} and sal_codigo_emp={1} and sal_nivel3='{2}' and sal_mes={3} group by sal_mes;",
                                            (year - 1), company, typeGraph, month);
                    }
                    else
                    {
                        query = String.Format("select sum(sal_valor_nac) from public.eeff_saldos_ebi_v where sal_tipo=1 and sal_movimiento=1 and sal_periodo={0} and sal_codigo_emp={1} and sal_nivel3='{2}' and sal_mes between 1 and {3} group by sal_mes;",
                                            (year - 1), company, typeGraph, month);
                    }
                }
            }

            //NpgsqlCommand command = _conDB.connnection3(query);
            var tuple = _conDB.connnection2(query);
            using (NpgsqlDataReader reader = tuple.Item1.ExecuteReader())
            {
                while (reader.Read())
                {
                    last_year.Add(Convert.ToDouble(_so.changeUnits(typeUnits, Convert.ToDouble(reader["sum"]))));
                }
                tuple.Item2.Close();
            }
            return last_year;
        }

        public List<double> consultPresupuest(int year, int month, string company, string typeVisualization, string typeUnits, string typeGraph)
        {
            List<double> presupuest = new List<double>();
            String query = "";

            if(typeGraph =="GASTOS OPERACIONALES")
            {
                if (month == 13)
                {
                    query = String.Format("select sum(sal_valor_nac) from public.eeff_saldos_ebi_v where sal_tipo=2 and  sal_periodo={0} and sal_codigo_emp ={1} and sal_movimiento=1 and sal_nivel1 ='GASTOS OPERACIONALES' group by sal_mes;",
                                            year, company);
                }
                else
                {
                    if (typeVisualization == "Mes")
                    {
                        query = String.Format("select sum(sal_valor_nac) from public.eeff_saldos_ebi_v where sal_tipo=2 and  sal_periodo={0} and sal_codigo_emp ={1} and sal_movimiento=1 and sal_nivel1 ='GASTOS OPERACIONALES' and sal_mes={2};",
                                            year, company, month);
                    }
                    else
                    {
                        query = String.Format("select sum(sal_valor_nac) from public.eeff_saldos_ebi_v where sal_tipo=2 and sal_periodo={0} and sal_codigo_emp ={1} and sal_movimiento=1 and sal_nivel1 ='GASTOS OPERACIONALES' and sal_mes between 1 and {2};",
                                            year, company, month);
                    }

                }
            }
            else
            {
                if (month == 13)
                {
                    query = String.Format("select sal_valor_nac from public.eeff_saldos_ebi_v where sal_tipo=2 and  sal_periodo={0} and sal_codigo_emp ={1} and sal_movimiento=1 and sal_nivel3 ='{2}';",
                                            year, company, typeGraph);
                }
                else
                {
                    if (typeVisualization == "Mes")
                    {
                        query = String.Format("select sal_valor_nac from public.eeff_saldos_ebi_v where sal_tipo=2 and  sal_periodo={0} and sal_codigo_emp ={1} and sal_movimiento=1 and sal_nivel3 ='{2}' and sal_mes={3};",
                                            year, company, typeGraph, month);
                    }
                    else
                    {
                        query = String.Format("select sal_valor_nac from public.eeff_saldos_ebi_v where sal_tipo=2 and sal_periodo={0} and sal_codigo_emp ={1} and sal_movimiento=1 and sal_nivel3 ='{2}' and sal_mes between 1 and {3};",
                                            year, company, typeGraph, month);
                    }

                }
            }


            //NpgsqlCommand command = _conDB.connnection3(query);
            var tuple = _conDB.connnection2(query);
            using (NpgsqlDataReader reader = tuple.Item1.ExecuteReader())
            {
                while (reader.Read())
                {
                    if(typeGraph =="GASTOS OPERACIONALES")
                    {
                        presupuest.Add(Convert.ToDouble(_so.changeUnits(typeUnits, Convert.ToDouble(reader["sum"]))));
                    }
                    else
                    {
                        presupuest.Add(Convert.ToDouble(_so.changeUnits(typeUnits, Convert.ToDouble(reader["sal_valor_nac"]))));
                    }
                    
                }
                tuple.Item2.Close();
            }

            return presupuest;
        }
    }
}
