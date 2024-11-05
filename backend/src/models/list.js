const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('List', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: '#2196f3'
    }
  });
};