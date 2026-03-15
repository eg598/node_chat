const { DataTypes } = require('sequelize');
const { client } = require('../db');

const User = client.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {
  User,
};
