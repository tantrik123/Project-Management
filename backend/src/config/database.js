
require('dotenv').config();

const config = {
  url: `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
  options: {
    dialect: 'postgres',
    logging: false,
  },
};

module.exports = config;
