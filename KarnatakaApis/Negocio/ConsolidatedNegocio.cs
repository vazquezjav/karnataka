using KarnatakaApis.Connections;
using KarnatakaApis.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KarnatakaApis.Negocio
{
    public class ConsolidatedNegocio
    {
        ConnectionBD _conDB = new ConnectionBD();
        SpendONegocio _so = new SpendONegocio();
        public ConsolidatedModel consultData(int year, int month, string company, string typeVisualization, string typeUnits, string typeGraph)
        {
            typeGraph = "%"+typeGraph;
            List<double> present_year = new List<double>();
            ConsolidatedModel consolidated = new ConsolidatedModel();
            string query = "";

            if (typeVisualization =="Mes")
            {
                query = String.Format("select sal_valor_nac  as valor, sal_porcentaje_val as porcent from public.eeff_valor_indicador_v where sal_periodo ={0} and sal_mes ={1} and sal_tipo =1 and sal_codigo_emp ={2} and sal_nombre_indicador ='{3}'",
                                            year,month, company, typeGraph);
            }
            else
            {
                query = String.Format("select sal_acumulado_nac  as valor, sal_porcentaje_acu as porcent from public.eeff_valor_indicador_v where sal_periodo ={0} and sal_mes ={1} and sal_tipo =1 and sal_codigo_emp ={2} and sal_nombre_indicador ='{3}'",
                                            year, month, company, typeGraph);
            }

            var tuple = _conDB.connnection2(query);
            double porcent = 0.0;
            double value = 0.0;

            using (NpgsqlDataReader reader = tuple.Item1.ExecuteReader())
            {
                while (reader.Read())
                {
                    value = Convert.ToDouble(reader["valor"]);
                    porcent = Convert.ToDouble(reader["porcent"]);
                }
                tuple.Item2.Close();
            }
            consolidated.value_present = _so.changeUnits(typeUnits,value);
            consolidated.porcent_present = porcent;
            List<double> last_year = consultLastYear(year, month, company, typeVisualization, typeUnits, typeGraph);

            consolidated.value_last = _so.changeUnits(typeUnits, last_year[0]);
            consolidated.porcent_last = last_year[1];

            consolidated.present_year = consultValuesPresent(year, company, typeVisualization, typeUnits, typeGraph); 
            consolidated.last_year = new List<double>();
            consolidated.presupuest = new List<double>();

            return consolidated;
        }

        public List<double> consultLastYear(int year, int month, string company, string typeVisualization, string typeUnits, string typeGraph)
        {
            List<double> last_year = new List<double>();
            BalanceModel balance = new BalanceModel();
            string query = "";
            if (typeVisualization == "Mes")
            {
                query = String.Format("select sal_valor_nac  as valor, sal_porcentaje_val as porcent from public.eeff_valor_indicador_v where sal_periodo ={0} and sal_mes ={1} and sal_tipo =1 and sal_codigo_emp ={2} and sal_nombre_indicador ='{3}'",
                                            (year-1), month, company, typeGraph);
            }
            else
            {
                query = String.Format("select sal_acumulado_nac  as valor, sal_porcentaje_acu as porcent from public.eeff_valor_indicador_v where sal_periodo ={0} and sal_mes ={1} and sal_tipo =1 and sal_codigo_emp ={2} and sal_nombre_indicador ='{3}'",
                                            (year - 1), month, company, typeGraph);
            }
            //NpgsqlCommand command = _conDB.connnection3(query);
            var tuple = _conDB.connnection2(query);
            double porcent = 0.0;
            double value = 0.0;
            using (NpgsqlDataReader reader = tuple.Item1.ExecuteReader())
            {
                while (reader.Read())
                {
                    value = Convert.ToDouble(reader["valor"]);
                    porcent = Convert.ToDouble(reader["porcent"]);
                }
                tuple.Item2.Close();
            }

            return new List<double> { value, porcent};

        }
        
        public List<double> consultValuesPresent(int year, string company, string typeVisualization, string typeUnits, string typeGraph)
        {
            List<double> present_year = new List<double>();
            string query = "";
            if (typeVisualization == "Mes")
            {
                query = String.Format("select sal_valor_nac as valor from public.eeff_valor_indicador_v where sal_periodo ={0}  and sal_tipo =1 and sal_codigo_emp ={1} and sal_nombre_indicador ='{2}';",
                                            year, company, typeGraph);
            }
            else
            {
                query = String.Format("select sal_acumulado_nac as valor from public.eeff_valor_indicador_v where sal_periodo ={0}  and sal_tipo =1 and sal_codigo_emp ={1} and sal_nombre_indicador ='{2}';",
                                            year, company, typeGraph);
            }
            //NpgsqlCommand command = _conDB.connnection3(query);
            var tuple = _conDB.connnection2(query);
            using (NpgsqlDataReader reader = tuple.Item1.ExecuteReader())
            {
                while (reader.Read())
                {
                    present_year.Add(Convert.ToDouble(_so.changeUnits(typeUnits, Convert.ToDouble(reader["valor"]))));
                }
                tuple.Item2.Close();
            }
            return present_year;
        }
    }
}
