module.exports = function(sequelize, Sequelize) {
    return sequelize.define("restaurant", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        logo: {
            type: Sequelize.TEXT
        },
        commercialName: {
            type: Sequelize.TEXT
        },
        legalName: {
            type: Sequelize.TEXT
        },
        rating: {
            type: Sequelize.FLOAT,
            validate: { min: 1, max: 5 }
        },
        commercialEmail: {
            type: Sequelize.TEXT
        },
        adminNumber: {
            type: Sequelize.TEXT
        },
        address: {
            type: Sequelize.TEXT
        },
        Location: {
            type: Sequelize.GEOMETRY('POINT')
        }
    }, {
        schema: 'sr_amaro',
        freezeTableName: true,
        tableName: 'restaurant',
        timestamps: false
    });
};