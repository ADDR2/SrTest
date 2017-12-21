const axios = require('axios');

const getDistance = (firstLocation, secondLocation) => {
    return axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${firstLocation}|&destinations=${secondLocation}&key=AIzaSyColnIk7nrUZXnFu2VAVUll9mNp6PpxmSE`);
};

module.exports = {
    getDistance
};