const db = require("../utils/database");

const { DataTypes } = require("sequelize");

const Users = db.define("users", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "name",
  },
  ci:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,
    field:'ci'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'normal'
  }
},{timestamps:false});

module.exports = Users