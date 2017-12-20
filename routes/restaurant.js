/* 3rd party libraries */
const router = require("express").Router();

/* Local import */
const logger = require("../logger");

module.exports = function(models, sequelize){
    
    const getAllRestaurants = (req, res) => {
        models.restaurant.all().then(
            restaurants => {
                res.status(200).send(restaurants);
            }, error => {
                logger.error(error);
                res.status(500).send("Something went wrong");
            }
        );
    };

    const createRestaurant = (req, res) => {
        const {
            logo,
            commercialName,
            legalName,
            commercialEmail,
            adminNumber,
            address,
            Location
        } = req.body;

        models.restaurant.create({
            logo,
            commercialName,
            legalName,
            commercialEmail,
            adminNumber,
            address,
            Location,
            rating: 1
        }).then(
            restaurant => {
                logger.info(`Restaurant *${commercialName}* successfully created`);
                res.status(200).send(restaurant);
            }, error => {
                logger.error(error);
                res.status(500).send("Something went wrong");
            }
        );
    };

    router.get("/", getAllRestaurants);
    router.post("/", createRestaurant);
    
    return router;
};