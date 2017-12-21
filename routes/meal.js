/* 3rd party libraries */
const router = require("express").Router();

/* Local libraries */
const logger = require("../utils/logger");

module.exports = function(models, sequelize){
    
    const getAllMeals = (req, res) => {
        models.meal.all().then(
            meals => {
                res.status(200).send(meals);
            }, error => {
                logger.error(error);
                res.status(500).send("Something went wrong");
            }
        );
    };

    const createMeal = (req, res) => {
        const {
            name,
            description,
            price,
            restaurant_id
        } = req.body;

        models.meal.create({
            name,
            description,
            price,
            restaurant_id
        }).then(
            meal => {
                res.status(200).send(meal);
            }, error => {
                logger.error(error);
                res.status(500).send("Something went wrong");
            }
        );
    };

    router.get("/", getAllMeals);
    router.post("/", createMeal);
    
    return router;
};