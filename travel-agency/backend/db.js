const sql = require("mssql");

const config = {
  user: "filip-login",
  password: "12345",
  server: "GRIGOROV",
  database: "turistickaAgencija",

  options: {
    trustServerCertificate: true,
  },
};

sql.connect(config)
  .then(() => {
    console.log("Connected to SQL Server");
  })
  .catch((err) => {
    console.log("Connection failed:", err);
  });

module.exports = sql;
