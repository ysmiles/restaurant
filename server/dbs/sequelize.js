// sequelize for ORM

const Sequelize = require('sequelize');
const config = require('./config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    operatorsAliases: false,
    host: config.host,
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('connection established!')
    })
    .catch(err => console.log('database connection failed: ' + err))

module.exports = sequelize