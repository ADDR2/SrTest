module.exports = function(sequelize, Sequelize) {
    return sequelize.define("meal", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: Sequelize.TEXT
        },
        description: {
            type: Sequelize.TEXT
        },
        price: {
            type: Sequelize.FLOAT
        }
    }, {
        schema: 'sr_amaro',
        freezeTableName: true,
        tableName: 'meal',
        timestamps: false
    });
};