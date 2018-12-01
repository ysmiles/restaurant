const sequelize = require('../dbs/sequelize')
const User = require('./User')

const Payment = sequelize.define('Payment', {
    payment_method_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'idAndNum',
        references: {
            model: User,
            key: customer_id
        }
    },
    customer_number: {
        type: Sequelize.STRING(16),
        allowNull: false,
        unique: 'idAndNum'
    },
    card_type: { type: Sequelize.STRING(30), allowNull: false },
    holder_name: { type: Sequelize.STRING(22), allowNull: false },
    expired_year: { type: Sequelize.STRING(4), allowNull: false },
    expired_month: { type: Sequelize.STRING(2), allowNull: false },
    cvv: { type: Sequelize.STRING(3), allowNull: false },
    billing_address: { type: Sequelize.STRING(200), allowNull: false },
    deleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
}, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // disable the modification of table names; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'Payment_method',
    });

module.exports = Payment