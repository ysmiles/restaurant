const Sequelize = require('sequelize');
const sequelize = require('../dbs/sequelize')

const Driver = sequelize.define('Driver', {
    driver_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: { type: Sequelize.STRING(40), allowNull: false },
    last_name: { type: Sequelize.STRING(30), allowNull: false },
    phone_number: { type: Sequelize.STRING(15), allowNull: false },
    license_plate: { type: Sequelize.STRING(8), allowNull: false },
    car_year: { type: Sequelize.STRING(4), allowNull: false },
    car_made: { type: Sequelize.STRING(20), allowNull: false },
    car_model: { type: Sequelize.STRING(20), allowNull: false },
    car_submodel: { type: Sequelize.STRING(20), allowNull: false },
    car_color: { type: Sequelize.STRING(20), allowNull: false },
    earning: { type: Sequelize.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
    email: { type: Sequelize.STRING(50), allowNull: false, unique: true },
    password: { type: Sequelize.STRING(64), allowNull: false },
    create_time: { 
        type: 'TIMESTAMP', 
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // disable the modification of table names; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'Driver',
    });

module.exports = Driver