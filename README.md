# Sr NodeJs Test

This project was built with node version ``8.9.2`` and requires ES6 syntax support. Also, will need connection to internet
so it can request some distances to the Google API.

## To initialize

This project requires a ``PostgreSQL v10`` database to store data. To create your database you'll need to execute ``init.sql``
on root of this project. To do that, run this command:

```
    $> psql -U <your user> <your password user> -f < init.sql
```

Replace ``<your user>`` with your PostgreSQL super user (usually ``postgres``) and ``<your password user>`` with its password
(usually also ``postgres``).

After that you can install the dependencies for this project with the following command:

```
    $> npm install
```

## To run

At this point you'll be able to run this project with the following command:

```
    $> npm start
```

Which does run this:

```
    $> node ./utils/init.js && node index.js
```

## To config

You can find config file to change your DB options called ```DB.json`` on ``/properties/`` folder.

You can also seed your database by running this command:

```
    $> npm run seed
```

Which is already been ran by ``npm start``. That seed command will wipe your entire DB and store some data for you.

## To test

By running the following command:

```
    $> npm test
```