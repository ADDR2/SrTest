/* 3rd party libraries */
const router = require("express").Router();
const { pick } = require("lodash");

/* Local import */
const logger = require("../utils/logger");

module.exports = function(models, sequelize){
    
    const getAllRestaurants = (req, res) => {
        const { min, max } = req.query;

        if((min && isNaN(Number(min))) || (max && isNaN(Number(max))))
            return res.status(400).send("Bad request");

        models.restaurant.findAll({
            where: { rating: { [sequelize.Op.gte]: Number(min) || 1, [sequelize.Op.lte]: Number(max) || 5 } }
        }).then(
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
                res.status(201).send(restaurant);
            }, error => {
                logger.error(error);
                res.status(500).send("Something went wrong");
            }
        );
    };

    const removeRestaurant = (req, res) => {
        const { id } = req.params;

        models.restaurant.destroy({
            where: { id }
        }).then(
            restaurant => {
                logger.info(`Restaurant *${id}* successfully deleted`);
                res.status(200).send("Deleted");
            }, error => {
                logger.error(error);
                res.status(500).send("Something went wrong");
            }
        );
    };

    const updateRestaurant = (req, res) => {
        const { id } = req.params;

        const toUpdate = pick(req.body, [
            "logo",
            "commercialName",
            "legalName",
            "commercialEmail",
            "adminNumber",
            "address",
            "Location"
        ]);

        models.restaurant.update(
            toUpdate,
            { where: { id } }
        ).then(
            restaurant => {
                logger.info(`Restaurant *${id}* successfully updated`);
                res.status(200).send("Updated");
            }, error => {
                logger.error(error);
                res.status(500).send("Something went wrong");
            }
        );
    };

    const rateRestaurant = (req, res) => {
        const { id } = req.params;
        const { rating, name, review } = req.body;

        if(!rating || typeof rating !== "number") return res.status(400).send("Bad request");

        models.review.create({
            name,
            review,
            rating,
            restaurant_id: id
        }).then(
            review => {
                return models.review.count({
                    where: { restaurant_id: review.restaurant_id }
                });
            }
        ).then(
            totalReviews => {
                return models.restaurant.update(
                    { rating: sequelize.literal(`((rating*${totalReviews-1}) + ${rating})/${totalReviews}`) },
                    { where: { id } }
                );
            }
        ).then(
            response => {
                logger.info(`Restaurant *${id}* successfully deleted`);
                res.status(200).send("Updated");
            }
        ).catch(
            error => {
                logger.error(error);
                res.status(500).send("Something went wrong");
            }
        );
    };

    router.get("/", getAllRestaurants);
    router.post("/", createRestaurant);
    router.delete("/:id", removeRestaurant);
    router.patch("/:id/rate", rateRestaurant);
    router.patch("/:id", updateRestaurant);
    
    return router;
};