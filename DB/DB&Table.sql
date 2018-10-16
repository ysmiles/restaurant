SET foreign_key_checks = 1;
drop database if exists cmpe295;
create database cmpe295;
use cmpe295;

create table Customer(
	customer_id int not null auto_increment,
	first_name varchar(40) not null,
	last_name varchar(30) not null,
	phone_number varchar(15) not null,
	email varchar(50) not null unique,
	password varchar(64) not null,
	create_time timestamp not null,
	primary key (customer_id)
);
	
create table Payment_method(
	payment_method_id int not null auto_increment,
	customer_id int not null,
	card_number varchar(16) not null,
	card_type varchar(30) not null,
	holder_name varchar(22) not null,
	expired_year varchar(4) not null,
	expired_month varchar(2) not null,
	cvv varchar(3) not null,
	billing_address varchar(200) not null,
	deleted boolean not null default false,
	primary key (payment_method_id),
	constraint unique(customer_id, card_number),
	foreign key (customer_id) references Customer(customer_id)
);

create table Driver(
	driver_id int not null auto_increment,
	first_name varchar(40) not null,
	last_name varchar(30) not null,
	phone_number varchar(15) not null,
	license_plate varchar(8) not null,
	car_year varchar(4) not null,
	car_made varchar(20) not null,
	car_model varchar(20) not null,
	car_submodel varchar(20) not null,
	car_color varchar(20) not null,
	earning decimal(10,2) not null default 0,
	email varchar(50) not null unique,
	password varchar(64) not null,
	create_time timestamp not null,
	primary key (driver_id)
);
	
create table Restaurant(
	restaurant_id int not null auto_increment,
	name varchar(50) not null,
	photo varchar(200),
	phone_number varchar(15) not null,
	address varchar(200) not null,
	earning decimal(10,2) not null default 0,
	email varchar(50) not null unique,
	password varchar(64) not null,
	create_time timestamp not null,
	primary key (restaurant_id)
);

create table Restaurant_business_hours(
	restaurant_id int not null,
	workday int not null,
	open_time time not null,
	close_time time not null,
	constraint unique(restaurant_id, workday),
	foreign key (restaurant_id) references Restaurant(restaurant_id)
);
	
create table Item(
	restaurant_id int not null,
	item_id int not null auto_increment,
	name varchar(50) not null,
	photo varchar(200),
	prepare_time int not null,
	unit_price decimal(4,2) not null,
	deleted boolean not null default false,
	primary key (item_id),
	constraint unique(restaurant_id, name),
	foreign key (restaurant_id) references Restaurant(restaurant_id)
);
	
create table Orders(
	orders_id varchar(13) not null,
	customer_id int not null,
	driver_id int not null,
	payment_method_id int not null,
	delivery_fee decimal(7,2) not null,
	tax decimal(7,2) not null,
	address varchar(200) not null,
	order_time timestamp not null,
	delivery_time timestamp,
	primary key (orders_id),
	foreign key (customer_id) references Customer(customer_id),
	foreign key (driver_id) references Driver(driver_id),
	foreign key (payment_method_id) references Payment_method(payment_method_id)
);
	
create table Orders_restaurant(
	orders_id varchar(13) not null,
	restaurant_id int not null,
	ready_time timestamp default null,
	pickup_time timestamp default null,
	primary key (orders_id, restaurant_id),
	foreign key (orders_id) references Orders(orders_id)
		on delete cascade	on update cascade,
	foreign key (restaurant_id) references Restaurant(restaurant_id)
);
	
create table Orders_item(
	orders_id varchar(13) not null,
	item_id int not null,
	quantity int not null,
	subtotal decimal(7,2) not null,
	primary key (orders_id, item_id),
	foreign key (orders_id) references Orders(orders_id)
		on delete cascade	on update cascade,
	foreign key (item_id) references Item(item_id)
);