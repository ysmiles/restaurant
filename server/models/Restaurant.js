const sequelize = require('../dbs/sequelize')

const Restaurant = sequelize.define('Restaurant', {
    restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: { type: Sequelize.STRING(50), allowNull: false },
    // The photo colomuns may not necessary
    photo: Sequelize.STRING(200),
    phone_number: { type: Sequelize.STRING(15), allowNull: false },
    address: { type: Sequelize.STRING(200), allowNull: false },
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
        tableName: 'Restaurant',
    });

module.exports = Restaurant