# API maunal

## The request API is RESTful, and the response is defined as JSON

### Restaurant

Only `Get` method is allowed for Restaurant query.

+ If you use restaurantId directly, the server will redirect the request to the restaurant home page and display all foods (array of food Item JSON).

> http://hosturl/restaurant?restaurantId=xxxx

+ Or you can use search, the return value is array of JSON. The `search` and `restaurantId` cannot coexist for restaurant

> http://hosturl/restaurant?search=keyWord

+ If there is no search or ID properties, the server will return all exists restaurants.

> http://hosturl/restaurant

+ You can also define the range:

> http://hosturl/restaurant?page=2&per_page=10

### Food

All http methods are open to request. To do: authentication process for post/put/delete.
For food you can define several properties in query simultaneously:

+ `restaurantId`: only return the foods information provided by specific restaurant

+ `search` or `foodId` 

+ The return value offset and range

> http://hosturl/foods?restaurantId=xxx&search=keyWord&page=2&per_page=10

### User

get/post/put http methods are open.

+ For `Get`: need `customer_id` property in query.

+ `Post`/`Put` methods: The request body need to be JSON corresponding to Customer structure in database.

### Order

To be completed

### Map

To be completed
