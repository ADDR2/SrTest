module.exports = function(sequelize){
    const models = {};
    
    /* Imports */
    models.meal = sequelize.import("./meal.js");
    models.order = sequelize.import("./order.js");
    models.restaurant = sequelize.import("./restaurant.js");
    models.review = sequelize.import("./review.js");
    models.sms = sequelize.import("./sms.js");

    /* Relations */
    models.meal.belongsTo(models.restaurant, { foreignKey: 'restaurant_id', sourceKey: 'id' });
    models.meal.belongsToMany(models.order, { through: 'meals_orders' });

    models.order.belongsToMany(models.meal, { through: 'meals_orders' });
    models.order.hasOne(models.sms, { foreignKey: 'order_id', sourceKey: 'id' });
    models.order.belongsTo(models.restaurant, { foreignKey: 'restaurant_id', sourceKey: 'id' });

    models.restaurant.hasMany(models.meal, { foreignKey: 'restaurant_id', sourceKey: 'id' });
    models.restaurant.hasMany(models.review, { foreignKey: 'restaurant_id', sourceKey: 'id' });
    models.restaurant.hasMany(models.order, { foreignKey: 'restaurant_id', sourceKey: 'id' });

    models.review.belongsTo(models.restaurant, { foreignKey: 'restaurant_id', sourceKey: 'id' });

    return models;
  };
  