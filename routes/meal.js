/* 3rd party libraries */
const router = require("express").Router();

/* Local libraries */

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
            price
        } = req.body;

        models.meal.create({
            name,
            description,
            price
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