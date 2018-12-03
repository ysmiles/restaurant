const sequelize = require('../dbs/sequelize')

// The data model corresponding to Customer in DB
const User = sequelize.define('User', {
    customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: { type: Sequelize.STRING(40), allowNull: false },
    last_name: { type: Sequelize.STRING(30), allowNull: false },
    phone_number: { type: Sequelize.STRING(15), allowNull: false },
    email: { type: Sequelize.STRING(50), allowNull: false, unique: true },
    password: { type: Sequelize.STRING(64), allowNull: false },
    create_time: { 
        type: 'TIMESTAMP', 
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
    /*
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
    */
}, {
        // disable the default timestamp
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // disable the modification of table names; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'Customer',
    });

module.exports = User