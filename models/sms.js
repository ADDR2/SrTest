module.exports = function(sequelize, Sequelize) {
    return sequelize.define("sms", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        address: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    }, {
        schema: 'sr_amaro',
        freezeTableName: true,
        tableName: 'sms',
        timestamps: false
    });
};