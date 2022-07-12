# Restaurant App

This app exposes some apis to work with restaurant data.
More info is mentioned below about usage.

## Installation

Run below command to install dependencies;

```
npm i
```

## APIs

Currently code is deployed to heroku free version

```
endpoint= https://git.heroku.com/glints-restaurant-app.git/api/v1
```

### Below API gets all the dishes within the price range with limit and offset

```
$ curl --location --request GET '${endpoint}/restaurant/dish?startPrice=1&endPrice=14&limit=10&offset=0'
```

### Below API search for restaurant using input

```
$ curl --location --request GET '${endpoint}/restaurant/search?searchText=indian'
```

### Below API make a user purchase for a dish from a restaurant

```
$ curl --location --request POST '${endpoint}/user/order' 
--header 'Content-Type: application/json' 
--data-raw '{
    "userId": "100",
    "restaurantId": "51",
    "dishId": "420"
}'
```