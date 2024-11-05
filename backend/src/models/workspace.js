const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Workspace', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    settings: {
      type: DataTypes.JSONB,
      defaultValue: {}
    }
  });
};