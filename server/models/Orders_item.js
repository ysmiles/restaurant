const Sequelize = require('sequelize');
const sequelize = require('../dbs/sequelize')
const Orders = require('./Orders')
const Food = require('./Food')

// The data model corresponding to Customer in DB
const Orders_item = sequelize.define('Orders_item', {
    orders_id: {
        type: Sequelize.STRING(13),
        allowNull: false,
        primaryKey: true,
        references: {
            model: Orders,
            key: 'orders_id'
        }
    },
    item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Food,
            key: 'item_id'
        }
    },
    quantity: {type: Sequelize.INTEGER, allowNull: false},
    subtotal: {type: Sequelize.DECIMAL(7, 2), allowNull: false}
}, {
    // disable the default timestamp
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'Orders_item',
});


Orders_item.belongsTo(Orders)


module.exports = Orders_item