const { DataTypes } = require('sequelize')
const { sequelize } = require('../Database/mysqlDbConnect')

// sequelize.define(modelName, attributes, options) //..how to define model
//creating a User model
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      },
    
    },
  
  {
    tableName: "employee table example",
  }
);

module.exports=User


//**Sequelize create model or can be use to work with existing Db */
// User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
// User.sync({ force: true }) - This creates the table, dropping it first if it already existed
// User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.

//drop()...is use to drop table
//User.drop();..example