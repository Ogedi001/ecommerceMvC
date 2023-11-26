require("dotenv").config();
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  `postgres://postgres:${process.env.pgDbpassword}@localhost:5432/pgExampleDb`
);

// mysql: This specifies the dialect, indicating that Sequelize should use the MySQL driver.
// root: this is  MySQL username.
// pgDbpassword: this is  MySQL password.
// localhost: this is the hostname or IP address of your MySQL server.
// 3306: This is the default port for MySQL. If your MySQL server uses a different port, replace 3306 with that port number.

// node_first: Replace this with the name of your MySQL database.

const mysqlConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Postgres DB Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the Postgres database:", error);
  }
};

module.exports = {
    sequelize,
    mysqlConnection,
};