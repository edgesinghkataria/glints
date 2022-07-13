# Restaurant App

This app exposes some apis to work with restaurant data.
More info is mentioned below about usage.

## Installation

Run below command to install dependencies;

```
npm i dotenv && npm i
```

Create .env file in package.json directory and add below keys in it

```
DB_NAME="database_name"
DB_USER="database_user"
DB_HOST="database_host"
DB_PASSWORD="database_password"
PORT=3001
DB_DRIVER="mysql"
```

## APIs

Currently code is deployed to heroku free version

```
endpoint= https://git.heroku.com/glints-restaurant-app.git/api/v1
```

### Below API gets all the dishes within the price range with limit and offset

All query params are required.

```
$ curl --location --request GET '${endpoint}/restaurant/dish?startPrice=1&endPrice=14&limit=10&offset=0'
```

### Below API search for restaurant using input

All query params are required.

```
$ curl --location --request GET '${endpoint}/restaurant/search?searchText=indian'
```

### Below API make a user purchase for a dish from a restaurant

All query params are required.

```
$ curl --location --request POST '${endpoint}/user/order' 
--header 'Content-Type: application/json' 
--data-raw '{
    "userId": "100",
    "restaurantId": "51",
    "dishId": "420"
}'
```

### Search restaurant that are open on perticular day&time

All query params are required.

```
$ curl --location --request GET 'localhost:3001/api/v1/restaurant/schedule?openingTime=0&closingTime=1200&limit=10&offset=0'
```


### To run the ETL on json files

```
$ curl --location --request GET '${endpoint}/run/etl'
```