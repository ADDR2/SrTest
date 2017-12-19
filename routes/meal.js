/* 3rd party libraries */
const router = require("express").Router();

/* Local libraries */

module.exports = function(models, sequelize){
    
    const getAllMeals = (req, res) => {
        res.status(200).send("Ok");
    };

    router.get("/", getAllMeals);
    
    return router;
};