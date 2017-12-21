module.exports = function(sequelize, Sequelize) {
    return sequelize.define("meals_orders", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }
    }, {
        schema: 'sr_amaro',
        freezeTableName: true,
        tableName: 'meals_orders',
        timestamps: false
    });
};