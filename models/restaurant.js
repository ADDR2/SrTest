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
            type: Sequelize.TEXT,
            allowNull: false
        },
        legalName: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        rating: {
            type: Sequelize.FLOAT,
            defaultValue: 1,
            validate: { min: 1, max: 5 }
        },
        commercialEmail: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: { isEmail: true }
        },
        adminNumber: {
            type: Sequelize.TEXT
        },
        address: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        Location: {
            type: Sequelize.GEOMETRY('POINT'),
            allowNull: false
        }
    }, {
        schema: 'sr_amaro',
        freezeTableName: true,
        tableName: 'restaurant',
        timestamps: false
    });
};