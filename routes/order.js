/* 3rd party libraries */
const router = require("express").Router();

/* Local imports */
const logger = require("../logger");
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyColnIk7nrUZXnFu2VAVUll9mNp6PpxmSE'
});

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
            meals
        } = req.body;

        const totalCost = req.body["total cost"];

        if(!meals || !Array.isArray(meals) || meals.length <= 0)
            return res.status(400).send("Bad request");

        
        models.order.create({
            address,
            position,
            "total cost": totalCost
        }).then(
            order => {
                logger.info(`Order *${address}* successfully created`);
                res.status(201).send(order);
            }, error => {
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