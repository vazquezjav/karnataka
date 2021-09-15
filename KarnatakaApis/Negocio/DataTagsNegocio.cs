using KarnatakaApis.Connections;
using KarnatakaApis.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace KarnatakaApis.Negocio
{
    public class DataTagsNegocio
    {
        ConnectionBD _conDB = new ConnectionBD();
        public DataTable consultData2()
        {
            ConnectionBD con = new ConnectionBD();
            string query = "SELECT seg_id, seg_nombre FROM public.g_segmento ORDER BY seg_codigo";

            return con.connection(query);
        }

        public List<CompanyModel> consultData()
        {
            List<CompanyModel> companyList = new List<CompanyModel>();
            
            string query = "select emp_id, emp_razon_social from g_empresa order by emp_id";
            var tuple = _conDB.connnection2(query);

            NpgsqlCommand command = tuple.Item1;
            NpgsqlConnection connection = tuple.Item2;
            using (NpgsqlDataReader reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    companyList.Add(new CompanyModel()
                    {
                        emp_id = reader["emp_id"].ToString(),
                        emp_razon_social = reader["emp_razon_social"].ToString()
                    });
                }
                reader.Close();
                connection.Close();
            }
            return companyList;
        }
    }
}
