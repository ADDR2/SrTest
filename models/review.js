module.exports = function(sequelize, Sequelize) {
    return sequelize.define("review", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: Sequelize.TEXT
        },
        review: {
            type: Sequelize.TEXT
        },
        rating: {
            type: Sequelize.INTEGER
        }
    }, {
        schema: 'sr_amaro',
        freezeTableName: true,
        tableName: 'review',
        timestamps: false
    });
};