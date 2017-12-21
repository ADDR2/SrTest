/* 3rd party libraries */
const router = require("express").Router();

/* Local libraries */
const logger = require("../utils/logger");

module.exports = function(models, sequelize){
    
    const getAllReviews = (req, res) => {
        models.review.all().then(
            reviews => {
                res.status(200).send(reviews);
            }, error => {
                logger.error(error);
                res.status(500).send("Something went wrong");
            }
        );
    };

    router.get("/", getAllReviews);
    
    return router;
};