module.exports = function(sequelize, Sequelize) {
    return sequelize.define("meal", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: { min: 0 }
        }
    }, {
        schema: 'sr_amaro',
        freezeTableName: true,
        tableName: 'meal',
        timestamps: false
    });
};