use foodelivery;

/* data in Customer */
insert into Customer (first_name, last_name, phone_number, email, password, create_time) 
	values ('CF1', 'CL1', '1234567890', 'cf1cl1@gmail.com', sha2('cf1cl1', 256), now());

/* data in Payment_method */
insert into Payment_method (customer_id, card_number, card_type, holder_name, 
	expired_year, expired_month, cvv, billing_address) 
	values (1, '4342123456781234', 'Visa', 'CF1 CL1', '2020', '10', '666',
	'1 SJSU, San Jose, CA 95192');
	
/* data in Driver */
insert into Driver (first_name, last_name, phone_number, license_plate, car_year, 
	car_made, car_model, car_submodel, car_color, email, password, create_time) 
	values ('Yi-Chin', 'Hsiao', '6692627289', '6UGE989', '2012', 'Nissan', 'Juke', 'SV', 'Gray', 
	'garyhsiao1219@gmail.com', 'yichin0091', now());
	
/* data in Restaurant */
insert into Restaurant (name, phone_number, address, email, password, create_time) 
	values ('Rest1', '6991234567', '20500 Town Center Lane, Cupertino, CA 95014',
	'rest1@gmail.com', sha2('rest1', 256), now());
	
/* data in Restaurant_business_hours */
insert into Restaurant_business_hours (restaurant_id, workday, open_time, close_time) 
	values (1, 1, '10:00', '21:00');
insert into Restaurant_business_hours (restaurant_id, workday, open_time, close_time) 
	values (1, 2, '10:00', '21:00');
insert into Restaurant_business_hours (restaurant_id, workday, open_time, close_time) 
	values (1, 3, '10:00', '21:00');
insert into Restaurant_business_hours (restaurant_id, workday, open_time, close_time) 
	values (1, 4, '10:00', '21:00');
insert into Restaurant_business_hours (restaurant_id, workday, open_time, close_time) 
	values (1, 5, '10:00', '22:00');
insert into Restaurant_business_hours (restaurant_id, workday, open_time, close_time) 
	values (1, 6, '11:00', '22:00');
insert into Restaurant_business_hours (restaurant_id, workday, open_time, close_time) 
	values (1, 7, '11:00', '21:00');

/* data in Item */
insert into Item (restaurant_id, name, prepare_time, unit_price) 
	values (1, 'Item1', 6, 7.5);
insert into Item (restaurant_id, name, prepare_time, unit_price) 
	values (1, 'Item2', 10, 11.75);
insert into Item (restaurant_id, name, prepare_time, unit_price) 
	values (1, 'Item3', 5, 6);

/* data in Orders */
insert into Orders (orders_id, customer_id, driver_id, payment_method_id, total_price,
	address, order_time) 
	values ('1234567890ABC', 1, 1, 1, 13.00, '526 Railway Avenue, Campbell, CA 95008', 
	now());
insert into Orders (orders_id, customer_id, driver_id, payment_method_id, total_price, 
	address, order_time) 
	values ('1234567890BCD', 1, 1, 1, 20.15, '526 Railway Avenue, Campbell, CA 95008', 
	now());
insert into Orders (orders_id, customer_id, driver_id, payment_method_id, total_price, 
	address, order_time)
	values ('1234567890CDE', 1, 1, 1, 9.65, '526 Railway Avenue, Campbell, CA 95008', 
	now());

/* data in Orders_restaurant */
insert into Orders_restaurant (orders_id, restaurant_id) 
	values ('1234567890ABC', 1);
insert into Orders_restaurant (orders_id, restaurant_id, ready_time) 
	values ('1234567890BCD', 1, '2018-10-15 15:00:00');
insert into Orders_restaurant (orders_id, restaurant_id, ready_time, pickup_time) 
	values ('1234567890CDE', 1, '2018-10-15 12:00:00', '2018-10-15 12:10:00');

/* data in Orders_item */
insert into Orders_item (orders_id, item_id, quantity, subtotal) 
	values ('1234567890ABC', 1, 3, 22.5);
insert into Orders_item (orders_id, item_id, quantity, subtotal) 
	values ('1234567890ABC', 3, 1, 6);
insert into Orders_item (orders_id, item_id, quantity, subtotal) 
	values ('1234567890BCD', 1, 3, 22.5);
insert into Orders_item (orders_id, item_id, quantity, subtotal) 
	values ('1234567890BCD', 3, 1, 6);
insert into Orders_item (orders_id, item_id, quantity, subtotal) 
	values ('1234567890CDE', 1, 3, 22.5);
insert into Orders_item (orders_id, item_id, quantity, subtotal) 
	values ('1234567890CDE', 3, 1, 6);

