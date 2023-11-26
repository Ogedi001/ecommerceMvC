require("dotenv").config();
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  `mysql://root:${process.env.mysqlDbpassword}@localhost:3306/node_first`
);

// mysql: This specifies the dialect, indicating that Sequelize should use the MySQL driver.
// root: this is  MySQL username.
// mysqlDbpassword: this is  MySQL password.
// localhost: this is the hostname or IP address of your MySQL server.
// 3306: This is the default port for MySQL. If your MySQL server uses a different port, replace 3306 with that port number.

// node_first: Replace this with the name of your MySQL database.


const mysqlConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Mysql Db Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the Mysql database:", error);
  }
};


//Alternative method

// const sequelize = new Sequelize({
//   dialect: "mysql", // specifying MySQL as the dialect
//   host: "localhost",
//   username: "root",
//   password: process.env.mysqlDbpassword,
//   port: 3306,
//   database: "node_first",
// });

module.exports = {
  sequelize,
  mysqlConnection,
};