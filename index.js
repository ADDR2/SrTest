/* 3rd party libraries */
const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require('sequelize');
const morgan = require('morgan');
const app = express();

/* Local imports */
const dbProperties = require('./properties/DB.json');

const sequelize = new Sequelize( ...dbProperties.config, dbProperties.DB );
const models = require('./models/index.js')(sequelize);

sequelize.sync()
  .then(
    () => console.error("Connected to DB"),
    error => console.error(error)
  )
;

/* Import routes */
const mealRoute = require("./routes/meal")(models, sequelize);
const restaurantRoute = require("./routes/restaurant")(models, sequelize);
const reviewRoute = require("./routes/review")(models, sequelize);

/* Post from evironment variables or 3000 by default */
const port = process.env.PORT || 3000;

/* Body parser to read json */
app.use(bodyParser.json());

/* Logger */
app.use(morgan('dev', {
  skip: function (req, res) {
      return res.statusCode < 400
  }, stream: process.stdout
}));

app.use(morgan('dev', {
  skip: function (req, res) {
      return res.statusCode >= 400
  }, stream: process.stderr
}));

/* Define routes */
app.use("/meals", mealRoute);
app.use("/restaurants", restaurantRoute);
app.use("/reviews", reviewRoute);

/* Listen on given port */
app.listen(port, () => {
  console.log(`Server up in port ${port}`);
});

module.exports = {
  app
};