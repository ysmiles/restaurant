package com.example.yichinhsiao.foodeliverydriver;

public class Item {
    String item_name;
    int qty;

    public Item(String item_name, int qty) {
        this.item_name = item_name;
        this.qty = qty;
    }

    public String getItemName() {
        return item_name;
    }

    public int getQty() {
        return qty;
    }
}
