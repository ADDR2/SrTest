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
                    order,
                    order.addMeals(meals)
                ]);
            }
        ).then(
            ([{ Location, commercialEmail }, { dataValues }]) => {
                return Promise.all([
                    getDistance(Location.coordinates, position.coordinates),
                    { ...dataValues, commercialEmail }
                ]);
            }
        ).then(
            ([ { data }, order ]) => {
                if(data.rows[0].elements[0].status === "OK"){
                    sender.channel.next().value(JSON.stringify(
                        order,
                        undefined,
                        2
                    ));

                    res.status(201).send(data.rows[0].elements[0].duration.text);
                } else {
                    logger.error("Google did not found a path for your motorcycle");
                    res.status(500).send("Something went wrong");
                }
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