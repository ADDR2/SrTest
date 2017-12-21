/* 3rd party libraries */
const router = require("express").Router();

/* Local imports */
const logger = require("../utils/logger");
const { getDistance } = require("../utils/requests");

module.exports = function(models, sequelize, sender){
    
    const getAllOrders = (req, res) => {
        models.order.all().then(
            orders => {
                res.status(200).send(orders);
            }, error => {
                logger.error(error);
                res.status(500).send("Something went wrong");
            }
        );
    };

    const createOrder = (req, res) => {
        const {
            address,
            position,
            meals,
            restaurant_id
        } = req.body;

        const totalCost = req.body["total cost"];

        if(!meals || !Array.isArray(meals) || meals.length <= 0)
            return res.status(400).send("Bad request");


        models.order.create({
            address,
            position,
            "total cost": totalCost,
            restaurant_id
        }).then(
            order => {
                logger.info(`Order *${address}* successfully created`);

                return Promise.all([
                    models.restaurant.findById(
                        restaurant_id,
                        { attributes: ['Location', 'commercialEmail'] }
                    ),
                    Promise.resolve(order),
                    order.addMeals(meals)
                ]);
            }
        ).then(
            results => {
                const { Location, commercialEmail } = results[0];
                sender.channel.next().value(JSON.stringify(
                    { ...results[1].dataValues, commercialEmail },
                    undefined,
                    2
                ));

                return getDistance(Location.coordinates, position.coordinates);
            }
        ).then(
            ({ data }) => {
                res.status(201).send(data.rows[0].elements[0].duration.text);
            }
        ).catch(
            error => {
                logger.error(error);
                res.status(500).send("Something went wrong");
            }
        );
    };

    router.get("/", getAllOrders);
    router.post("/", createOrder);
    //router.delete("/:id", removeOrder);
    //router.patch("/:id", updateOrder);
    
    return router;
};