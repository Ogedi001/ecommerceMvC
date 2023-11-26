const express = require("express");
const { sequelize, mysqlConnection } = require("./Database/mysqlDbConnect");
const User = require("./models/mysqlUser");

const app = express();
app.use(express.urlencoded({ extended: false }));
const startServer = async () => {
  try {
      await mysqlConnection();
      //creating new user
    // await User.create({
    //   username: "marry",
    //     password: 'dodod'
    // });

    await User.sync({ alter: true });

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.log("Error starting server", error);
    process.exit(1);
  }
};

startServer();
