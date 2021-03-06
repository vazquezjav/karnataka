using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace KarnatakaApis.Connections
{

    public class ConnectionBD
    {
        private static string host = "10.0.2.223";
        private static string port = "5432";
        private static string username = "corp_usr";
        private static string password = "corp2021";
        private static string database = "dbcorp";

        public ConnectionBD()
        {

        }
        public DataTable connection(string query)
        {
            DataTable table = new DataTable();
            NpgsqlDataReader reader;
            string connString = String.Format("Server={0}; User Id={1}; Database={2}; Port={3}; Password={4}",
                    host, username, database, port, password);
            using (NpgsqlConnection connection = new NpgsqlConnection(connString))
            {
                try
                {
                    connection.Open();
                    using (NpgsqlCommand command = new NpgsqlCommand(query, connection))
                    {
                        reader = command.ExecuteReader();
                        table.Load(reader);

                        reader.Close();
                        connection.Close();
                    }
                }
                catch (Exception)
                {
                    connection.Close();
                }

            }
            return table;
        }

        public Tuple<NpgsqlCommand, NpgsqlConnection> connnection2(string query)
        {
            string connString = String.Format("Server={0}; User Id={1}; Database={2}; Port={3}; Password={4}",
                    host, username, database, port, password);
            NpgsqlConnection connection = new NpgsqlConnection(connString);
            NpgsqlCommand command = new NpgsqlCommand();
            try
            {
                connection.Open();
                command = new NpgsqlCommand(query, connection);
                
            }
            catch (Exception)
            {
                connection.Close();
            }
            return new Tuple<NpgsqlCommand, NpgsqlConnection>(command, connection);
        }

        public NpgsqlCommand connnection3(string query)
        {
            string connString = String.Format("Server={0}; User Id={1}; Database={2}; Port={3}; Password={4}",
                    host, username, database, port, password);
            NpgsqlConnection connection = new NpgsqlConnection(connString);
            NpgsqlCommand command = new NpgsqlCommand();
            try
            {
                connection.Open();
                command = new NpgsqlCommand(query, connection);

            }
            catch (Exception)
            {
                connection.Close();
            }
            return command;
        }
    }
}
