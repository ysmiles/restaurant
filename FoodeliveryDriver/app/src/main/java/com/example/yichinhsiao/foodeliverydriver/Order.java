package com.example.yichinhsiao.foodeliverydriver;

import java.util.ArrayList;

public class Order {
    String customer_name, customer_address, restaurant_name, restaurant_address, order_id;
    ArrayList<Item> items;

    public Order(String customer_name, String customer_address, String restaurant_name,
                 String restaurant_address, String order_id, ArrayList<Item> items) {
        this.customer_name = customer_name;
        this.customer_address = customer_address;
        this.restaurant_name = restaurant_name;
        this.restaurant_address = restaurant_address;
        this.order_id = order_id;
        this.items = items;
    }

    public String getCustomerName() {
        return customer_name;
    }

    public String getCustomerAddress() {
        return customer_address;
    }

    public String getRestaurantName() {
        return restaurant_name;
    }

    public String getRestaurantAddress() {
        return restaurant_address;
    }

    public String getOrderID() {
        return order_id;
    }

    public ArrayList<Item> getItems() {
        return items;
    }
}
