module.exports = function(sequelize){
    const models = {};
    
    /* Imports */
    models.meal = sequelize.import("./meal.js");
    models.restaurant = sequelize.import("./restaurant.js");
    models.review = sequelize.import("./review.js");

    /* Relations */

    return models;
  };
  