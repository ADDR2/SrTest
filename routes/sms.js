/* 3rd party libraries */
const router = require("express").Router();

/* Local libraries */
const logger = require("../utils/logger");

module.exports = function(models, sequelize){
    
    const getAllSms = (req, res) => {
        models.sms.all().then(
            sms => {
                res.status(200).send(sms);
            }, error => {
                logger.error(error);
                res.status(500).send("Something went wrong");
            }
        );
    };

    router.get("/", getAllSms);
    
    return router;
};