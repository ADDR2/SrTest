module.exports = function(sequelize, Sequelize) {
    return sequelize.define("order", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        address: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        "total cost": {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: { min: 0 }
        },
        position: {
            type: Sequelize.GEOMETRY('POINT'),
            allowNull: false
        }
    }, {
        schema: 'sr_amaro',
        freezeTableName: true,
        tableName: 'order',
        timestamps: false
    });
};