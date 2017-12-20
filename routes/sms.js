/* 3rd party libraries */
const router = require("express").Router();

/* Local libraries */

module.exports = function(models, sequelize){
    
    const getAllSms = (req, res) => {
        res.status(200).send("Ok");
    };

    router.get("/", getAllSms);
    
    return router;
};