/* 3rd party libraries */
const Sequelize = require('sequelize');

/* Local libraries */
const dbProperties = require('./../properties/DB.json');
const sequelize = new Sequelize( ...dbProperties.config, dbProperties.DB );
const models = require('./../models/index.js')(sequelize);
const logger = require("./logger");

const seed = {
    restaurant: [
        {
            "id": 200,
            "logo": "http://dummyimage.com/176x202.jpg/dddddd/000000",
            "commercialName": "Tres-Zap",
            "legalName": "Aibox",
            "commercialEmail": "aduarte@teravisiontech.com",
            "adminNumber": "\"'\"'\"''''\"",
            "address": "95170 Dixon Trail",
            "Location": {
                "type": "Point",
                "coordinates": [4.67665,-74.0480397]
            }
        }, {
            "id": 201,
            "logo": "http://dummyimage.com/199x150.png/5fa2dd/ffffff",
            "commercialName": "Kanlam",
            "legalName": "Jayo",
            "commercialEmail": "aduarte@teravisiontech.com",
            "adminNumber": "\"\"",
            "address": "623 Mccormick Court",
            "Location": {
                "type": "Point",
                "coordinates": [24.7645491,-12.4839784]
            }
        }, {
            "id": 202,
            "logo": "http://dummyimage.com/203x228.jpg/ff4444/ffffff",
            "commercialName": "Gembucket",
            "legalName": "Jabbersphere",
            "commercialEmail": "aduarte@teravisiontech.com",
            "adminNumber": "<img src=x onerror=alert('hi') />",
            "address": "25266 Independence Junction",
            "Location": {
                "type": "Point",
                "coordinates": [-27.3248027,-67.0123332]
            }
        }, {
            "id": 203,
            "logo": "http://dummyimage.com/223x233.png/5fa2dd/ffffff",
            "commercialName": "Domainer",
            "legalName": "Wikivu",
            "commercialEmail": "aduarte@teravisiontech.com",
            "adminNumber": "œ∑´®†¥¨ˆøπ“‘",
            "address": "38 Duke Road",
            "Location": {
                "type": "Point",
                "coordinates": [17.8403059,81.9038907]
            }
        }, {
            "id": 204,
            "logo": "http://dummyimage.com/246x186.bmp/ff4444/ffffff",
            "commercialName": "Prodder",
            "legalName": "InnoZ",
            "commercialEmail": "aduarte@teravisiontech.com",
            "adminNumber": "<svg><script>0<1>alert('XSS')</script>",
            "address": "8 Sherman Center",
            "Location": {
                "type": "Point",
                "coordinates": [50.5421926,100.9159815]
            }
        }
    ],
    meal: [
        {
            "id": 1,
            "name": "Wallaroo, common",
            "description": "１２３",
            "price": 11.01,
            "restaurant_id": 200
        }, {
            "id": 2,
            "name": "White-winged black tern",
            "description": "部落格",
            "price": 10.32,
            "restaurant_id": 200
        }, {
            "id": 3,
            "name": "Western lowland gorilla",
            "description": "␣",
            "price": 15.64,
            "restaurant_id": 201
        }, {
            "id": 4,
            "name": "Zorro, common",
            "description": ",./;'[]\\-=",
            "price": 8.34,
            "restaurant_id": 201
        }, {
            "id": 5,
            "name": "Palm squirrel",
            "description": "社會科學院語學研究所",
            "price": 1.61,
            "restaurant_id": 202
        }, {
            "id": 6,
            "name": "Phalarope, red-necked",
            "description": "!@#$%^&*()",
            "price": 28.44,
            "restaurant_id": 202
        }, {
            "id": 7,
            "name": "Bunting, crested",
            "description": "\"",
            "price": 22.33,
            "restaurant_id": 203
        }, {
            "id": 8,
            "name": "Green vine snake",
            "description": "() { _; } >_[$($())] { touch /tmp/blns.shellshock2.fail; }",
            "price": 4.86,
            "restaurant_id": 203
        }, {
            "id": 9,
            "name": "Spur-winged goose",
            "description": "␡",
            "price": 13.15,
            "restaurant_id": 204
        }, {
            "id": 10,
            "name": "Snake, western patch-nosed",
            "description": "0/0",
            "price": 3.04,
            "restaurant_id": 204
        }
    ]
};

function wipeData () {
    const tables = Object.keys(models);

    return Promise.all(
        tables.map(table => models[table].destroy({ where: {} }))
    );
}

function populateDB (index) {
    const tables = Object.keys(seed);

    if(index < tables.length){
        const rows = seed[tables[index]];
        const inserts = rows.map(
            row => models[tables[index]].create(row)
        );

        Promise.all(inserts).then(
            () => {
                logger.info(`Table ${tables[index]} successfully populated`);
                populateDB(index+1);
            }, error => {
                logger.error(error);
                process.exit(1);
            }
        );
    } else {
        process.exit(0);
    }
}

sequelize.sync()
  .then(
    () => {
        console.error("Connected to DB");
        wipeData().then(
            () => {
                logger.info(`Data successfully wiped`);
                populateDB(0);
            },
            error => {
                logger.error(error);
                process.exit(1);
            }
        );
    },
    error => console.error(error)
  )
;