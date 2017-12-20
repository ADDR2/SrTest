module.exports = function(sequelize, Sequelize) {
    return sequelize.define("review", {
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
        review: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        rating: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: { min: 1, max: 5 }
        }
    }, {
        schema: 'sr_amaro',
        freezeTableName: true,
        tableName: 'review',
        timestamps: false
    });
};