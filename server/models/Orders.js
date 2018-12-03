const Sequelize = require('sequelize');
const sequelize = require('../dbs/sequelize')
const User = require('./User')
const Driver = require('./Driver')
const Payment = require('./Payment')

// The data model corresponding to Customer in DB
const Orders = sequelize.define('Orders', {
    orders_id: {
        type: Sequelize.STRING(13),
        allowNull: false,
        primaryKey: true,
    },
    customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'customer_id'
        }
    },
    driver_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Driver,
            key: 'driver_id'
        }
    },
    payment_method_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Payment,
            key: 'payment_method_id'
        }
    },
    total_price: { type: Sequelize.DECIMAL(8, 2), allowNull: false },
    address: { type: Sequelize.STRING(200), allowNull: false },
    order_time: { type: 'TIMESTAMP', allowNull: false },
    delivery_time: { type: 'TIMESTAMP' },
}, {
        // disable the default timestamp
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // disable the modification of table names; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'Orders',
    });

module.exports = Orders