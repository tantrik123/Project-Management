const { Sequelize } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(config.url, config.options);

const User = require('./user')(sequelize);
const Workspace = require('./workspace')(sequelize);
const Task = require('./task')(sequelize);
const List = require('./list')(sequelize);

// Define relationships
User.hasMany(Workspace);
Workspace.belongsTo(User);

Workspace.hasMany(List);
List.belongsTo(Workspace);

List.hasMany(Task);
Task.belongsTo(List);

Task.belongsTo(User, { as: 'assignee' });
Task.belongsTo(User, { as: 'creator' });

module.exports = {
  sequelize,
  User,
  Workspace,
  Task,
  List
};