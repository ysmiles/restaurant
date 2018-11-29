USE `foodelivery`;
DROP procedure IF EXISTS `checkRestaurantEmailExisted`;

DELIMITER $$
USE `foodelivery`$$
CREATE PROCEDURE `checkRestaurantEmailExisted` (
    IN in_email VARCHAR(50))
BEGIN
	SELECT email
	FROM Restaurant
	WHERE email = in_email;
END$$

DELIMITER ;



USE `foodelivery`;
DROP procedure IF EXISTS `registerRestaurant`;

DELIMITER $$
USE `foodelivery`$$
CREATE PROCEDURE `registerRestaurant` (
    IN in_name VARCHAR(50),
    IN in_photo VARCHAR(200),
    IN in_phone_number VARCHAR(15),
    IN in_address VARCHAR(200),
    IN in_email VARCHAR(50),
    IN in_password VARCHAR(64))
BEGIN
	INSERT INTO Restaurant (name, photo, phone_number, address, email, password, create_time)
	VALUE (in_name, in_photo, in_phone_number, in_address, in_email, in_password, now());
END$$

DELIMITER ;



USE `foodelivery`;
DROP procedure IF EXISTS `loginRestaurant`;

DELIMITER $$
USE `foodelivery`$$
CREATE PROCEDURE `loginRestaurant` (
    IN in_email VARCHAR(50),
    IN in_password VARCHAR(64))
BEGIN
	SELECT restaurant_id
	FROM Restaurant
	WHERE email = in_email AND password = in_password;
END$$

DELIMITER ;



USE `foodelivery`;
DROP procedure IF EXISTS `updateRestaurant`;

DELIMITER $$
USE `foodelivery`$$
CREATE PROCEDURE `updateRestaurant` (
	IN in_restaurant_id INT,
    IN in_name VARCHAR(50),
    IN in_photo VARCHAR(200),
    IN in_phone_number VARCHAR(15),
    IN in_address VARCHAR(200),
    IN in_password VARCHAR(64))
BEGIN
	UPDATE Restaurant
	SET name = in_name, photo = in_photo, phone_number = in_phone_number, 
		address = in_address, password = in_password
	WHERE restaurant_id = in_restaurant_id;
END$$

DELIMITER ;


USE `foodelivery`;
DROP procedure IF EXISTS `addBusinessHours`;

DELIMITER $$
USE `foodelivery`$$
CREATE PROCEDURE `addBusinessHours` (
	IN in_restaurant_id INT,
    IN in_workday INT,
    IN in_open_time TIME,
    IN in_close_time TIME)
BEGIN
	INSERT INTO Restaurant_business_hours (restaurant_id, workday, open_time, close_time)
	VALUE (in_restaurant_id, in_workday, in_open_time, in_close_time);
END$$

DELIMITER ;



USE `foodelivery`;
DROP procedure IF EXISTS `updateBusinessHours`;

DELIMITER $$
USE `foodelivery`$$
CREATE PROCEDURE `updateBusinessHours` (
	IN in_restaurant_id INT,
    IN in_workday INT,
    IN in_open_time TIME,
    IN in_close_time TIME)
BEGIN
	UPDATE Restaurant_business_hours
	SET open_time = in_open_time, close_time = in_close_time
	WHERE restaurant_id = in_restaurant_id AND workday = in_workday;
END$$

DELIMITER ;



USE `foodelivery`;
DROP procedure IF EXISTS `deleteBusinessHours`;

DELIMITER $$
USE `foodelivery`$$
CREATE PROCEDURE `deleteBusinessHours` (
	IN in_restaurant_id INT,
    IN in_workday INT)
BEGIN
	DELETE FROM Restaurant_business_hours
	WHERE restaurant_id = in_restaurant_id AND workday = in_workday;
END$$

DELIMITER ;



USE `foodelivery`;
DROP procedure IF EXISTS `checkItemExisted`;

DELIMITER $$
USE `foodelivery`$$
CREATE PROCEDURE `checkItemExisted` (
	IN in_restaurant_id INT,
    IN in_name VARCHAR(50))
BEGIN
	SELECT item_id
	FROM Item
	WHERE restaurant_id = in_restaurant_id AND name = in_name;
END$$

DELIMITER ;



USE `foodelivery`;
DROP procedure IF EXISTS `uploadItem`;

DELIMITER $$
USE `foodelivery`$$
CREATE PROCEDURE `uploadItem` (
	IN in_restaurant_id INT,
    IN in_name VARCHAR(50),
    IN in_photo VARCHAR(200),
    IN in_prepare_time INT,
    IN in_unit_price DECIMAL(4,2))
BEGIN
	INSERT INTO Item (restaurant_id, name, photo, prepare_time, unit_price)
	VALUE (in_restaurant_id, in_name, in_photo, in_prepare_time, in_unit_price);
END$$

DELIMITER ;



USE `foodelivery`;
DROP procedure IF EXISTS `updateItem`;

DELIMITER $$
USE `foodelivery`$$
CREATE PROCEDURE `updateItem` (
	IN in_restaurant_id INT,
    IN in_name VARCHAR(50),
    IN in_photo VARCHAR(200),
    IN in_prepare_time INT,
    IN in_unit_price DECIMAL(4,2))
BEGIN
	UPDATE Item
	SET photo = in_photo, prepare_time = in_prepare_time, unit_price = in_unit_price
	WHERE restaurant_id = in_restaurant_id AND name = in_name;
END$$

DELIMITER ;



USE `foodelivery`;
DROP procedure IF EXISTS `deleteItem`;

DELIMITER $$
USE `foodelivery`$$
CREATE PROCEDURE `deleteItem` (
	IN in_restaurant_id INT,
    IN in_name VARCHAR(50))
BEGIN
	UPDATE Item
	SET deleted = true
	WHERE restaurant_id = in_restaurant_id AND name = in_name;
END$$

DELIMITER ;



USE `foodelivery`;
DROP procedure IF EXISTS `showItemRestaurantMode`;

DELIMITER $$
USE `foodelivery`$$
CREATE PROCEDURE `showItemRestaurantMode` (
	IN in_restaurant_id INT)
BEGIN
	SELECT name, photo, prepare_time, unit_price, deleted
	FROM Item
	WHERE restaurant_id = in_restaurant_id;
END$$

DELIMITER ;



USE `foodelivery`;
DROP procedure IF EXISTS `showRestaurantActiveOrders`;

DELIMITER $$
USE `foodelivery`$$
CREATE PROCEDURE `showRestaurantActiveOrders` (
	IN in_restaurant_id INT)
BEGIN
	SELECT OrdersR.orders_id, I.name, OrdersI.quantity
	FROM Orders_restaurant AS OrdersR, Orders_item AS OrdersI, Item AS I
	WHERE OrdersR.restaurant_id = in_restaurant_id AND OrdersR.orders_id = OrdersI.orders_id
		  AND OrdersI.item_id = I.item_id AND ready_time IS NULL;
END$$

DELIMITER ;


USE `foodelivery`;
DROP procedure IF EXISTS `updateRestaurantActiveOrders`;

DELIMITER $$
USE `foodelivery`$$
CREATE PROCEDURE `updateRestaurantActiveOrders` (
	IN in_restaurant_id INT,
	IN in_orders_id VARCHAR(13))
BEGIN
	UPDATE Orders_restaurant
	SET ready_time = now()
	WHERE restaurant_id = in_restaurant_id AND orders_id = in_orders_id;
END$$

DELIMITER ;



USE `foodelivery`;
DROP procedure IF EXISTS `showRestaurantReadyOrders`;

DELIMITER $$
USE `foodelivery`$$
CREATE PROCEDURE `showRestaurantReadyOrders` (
	IN in_restaurant_id INT)
BEGIN
	SELECT OrdersR.orders_id, I.name, OrdersI.quantity, OrdersR.ready_time
	FROM Orders_restaurant AS OrdersR, Orders_item AS OrdersI, Item AS I
	WHERE OrdersR.restaurant_id = in_restaurant_id AND OrdersR.orders_id = OrdersI.orders_id
		  AND OrdersI.item_id = I.item_id AND ready_time IS NOT NULL AND pickup_time IS NULL;
END$$

DELIMITER ;



USE `foodelivery`;
DROP procedure IF EXISTS `updateRestaurantReadyOrders`;

DELIMITER $$
USE `foodelivery`$$
CREATE PROCEDURE `updateRestaurantReadyOrders` (
	IN in_restaurant_id INT,
	IN in_orders_id VARCHAR(13))
BEGIN
	UPDATE Orders_restaurant
	SET pickup_time = now()
	WHERE restaurant_id = in_restaurant_id AND orders_id = in_orders_id;
END$$

DELIMITER ;



USE `foodelivery`;
DROP procedure IF EXISTS `showRestaurantOrdersHistory`;

DELIMITER $$
USE `foodelivery`$$
CREATE PROCEDURE `showRestaurantOrdersHistory` (
	IN in_restaurant_id INT)
BEGIN
	SELECT OrdersR.orders_id, I.name, OrdersI.quantity, OrdersI.subtotal, OrdersR.ready_time, 
		   OrdersR.pickup_time
	FROM Orders_restaurant AS OrdersR, Orders_item AS OrdersI, Item AS I
	WHERE OrdersR.restaurant_id = in_restaurant_id AND OrdersR.orders_id = OrdersI.orders_id
		  AND OrdersI.item_id = I.item_id AND pickup_time IS NOT NULL;
END$$

DELIMITER ;