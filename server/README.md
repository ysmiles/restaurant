# API maunal

## The "API" prefix is added

> http://hosturl/api/query

## The Response Convention:

+ if error occurs, the server will return a json which contains a `status` property with `false` value and a `descrition` property with error detail.

``` json
{
    status: false,
    description: err
}
```

+ if processed as expected, the server will return a json or an array of json, determined by the request.

### Restaurant

Only `Get` method is allowed for Restaurant query.

+ If you use restaurantId directly, the server will redirect the request to the restaurant home page and display all foods (array of food Item JSON).

> http://hosturl/api/restaurant?restaurantId=xxxx

+ Or you can use search, the return value is array of JSON. The `search` and `restaurantId` cannot coexist for restaurant

> http://hosturl/api/restaurant?search=keyWord

+ If there is no search or ID properties, the server will return all exists restaurants.

> http://hosturl/api/restaurant

+ You can also define the range:

> http://hosturl/api/restaurant?page=2&per_page=10

**Return Value:**

+ If you defined the restaurantId in request, it will directly redirect to food page

+ Otherwise it will return an array of restaurant

``` json
{
    restaurant_id:
    name:
    phone_number:
    address:
    email:
    password:
    [photo:] [earning:]
}
```

### Food

All http methods are open to request.

For `Get` food you can define several properties in query simultaneously:

** Return value: ** Array of food json

+ `restaurantId`: only return the foods information provided by specific restaurant

+ `search` or `itemId` 

+ The return value offset and range

> http://hosturl/api/foods?restaurantId=xxx&search=keyWord&page=2&per_page=10

+ if you want all food items in database:

> http://hosturl/api/foods

`post` `update` method:

**Return value:** A json object corresponding to the item

+ The request body should be a json object:

``` json
{
    restaunrant_id:
    item_id: (only for put method)
    name:
    unit_price:
    description:
    photo:
}
```

### User

get/post http methods are open.

+ For `Get`: need `customerId` property in query.

> http://hosturl/api/user?customerId=xxx

+ `Post` methods: The request body need to be JSON corresponding to Customer structure in database. The `post` method cannot send customerId to server

#### Login for user

The server will only validate whether the user exist, the client need to save user ID for further operation.

It should be a post method, and the request body should be:
```json
{
    email:
    password:
}
```
API:

> http://hosturl/api/user/login

**Return Value**

``` json
{
    status: false
}

{
    status: true
    id: someone's ID
}
```


### Static Resources:

You can directly access all resources under public folder:

For example to access the picture in public/image folder

> http://hosturl/image/1-a.jpg

### Order
To query an order, you should at least submit the `orderId` or `customerId`

> http://hosturl/api/order?orderId=xxx

> http://hosturl/api/order?customerId=xxx

+ if search by orderId

**Return Value**
```json
{
    order: an order object, look up the structure of order in database,
    items: [Array of Orders_item objects in this order]
}
```

+ if search by customerId

**Return Value**: Array of `order` object, the order is time DESC, which means the first one is always the latest.

#### Submit Order
To submit an order, use `post` method, it will return created order object

> http://hosturl/api/order

``` json
{
    "customer_id": 100,
    "total_price": 130,
    "address": "1600 Amphitheatre Parkway, Mountain View, CA",
    "items": [{"item_id": 111, "quantity": 1, "subtotal": 0}]
}
```

### Map

Get all planned routes, return an array of routes:

> http://hosturl/api/routes
