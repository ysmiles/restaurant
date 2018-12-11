package com.example.yichinhsiao.foodeliverydriver;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.constraint.ConstraintLayout;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class MyCurrentTaskActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

    SharedPreferences sharedPreferences;
    Boolean has_task;
    Button navigation, task_complete, fetch_task;
    ConstraintLayout my_current_task_layout, fetch_task_layout;
    ListView order_list;
    ArrayList<Order> orders;
    ArrayList<Item> items;

    JSONObject task;
    String origin, destination, waypoints;
    String[] order_ids;

    TextView customer_name, customer_address, restaurant_name, restaurant_address, order_id, item_list;
    Button order_complete;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my_current_task);
        MyCurrentTaskActivity.this.setTitle(R.string.my_current_task);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout_my_current_task);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

        my_current_task_layout = (ConstraintLayout) findViewById(R.id.content_my_current_task);
        fetch_task_layout = (ConstraintLayout) findViewById(R.id.content_fetch_task);
        order_list = (ListView) findViewById(R.id.my_current_task_order_list);

        sharedPreferences = getSharedPreferences("Driver", MODE_PRIVATE);
        has_task = sharedPreferences.getBoolean("task", false);

        if (has_task) {
            my_current_task_layout.setVisibility(View.VISIBLE);
            fetch_task_layout.setVisibility(View.INVISIBLE);
        } else {
            my_current_task_layout.setVisibility(View.INVISIBLE);
            fetch_task_layout.setVisibility(View.VISIBLE);
        }

        navigation = (Button) findViewById(R.id.my_current_task_btn_start_navigation);
        navigation.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String url = "https://www.google.com/maps/dir/?api=1&destination=" + destination +
                        "&origin=My+Location&travelmode=driving&dir_action=navigate&waypoints=" + waypoints;
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                startActivity(intent);
            }
        });

        task_complete = (Button) findViewById(R.id.my_current_task_btn_complete);
        task_complete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sharedPreferences = getSharedPreferences("Driver", MODE_PRIVATE);
                sharedPreferences.edit().putBoolean("task", false).apply();
                my_current_task_layout.setVisibility(View.INVISIBLE);
                fetch_task_layout.setVisibility(View.VISIBLE);
            }
        });

        fetch_task = (Button) findViewById(R.id.my_current_task_fetch_task);
        fetch_task.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                RequestQueue requestQueue = Volley.newRequestQueue(MyCurrentTaskActivity.this);
                String url = "http://35.236.103.93/api/routes/fetchOne";
                StringRequest stringRequest = new StringRequest(Request.Method.GET, url, new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            task = new JSONObject(response);
                            if(!task.isNull("status") && !task.getBoolean("status")) {
                                Toast.makeText(MyCurrentTaskActivity.this, "There is no active task now", Toast.LENGTH_LONG).show();
                            }
                            else {
                                origin = task.getJSONObject("direction").getString("origin");
                                destination = task.getJSONObject("direction").getString("destination");
                                waypoints = task.getJSONObject("direction").getString("waypoints");
                                int length = task.getJSONArray("orderId").length();
                                order_ids = new String[length];
                                for(int i = 0; i < length; i++) {
                                    order_ids[i] = task.getJSONArray("orderId").getString(i);
                                }

                                setTaskData();
                                CustomAdapter customAdapter = new CustomAdapter(MyCurrentTaskActivity.this, orders);
                                order_list.setAdapter(customAdapter);

                                sharedPreferences = getSharedPreferences("Driver", MODE_PRIVATE);
                                sharedPreferences.edit().putBoolean("task", true).apply();
                                my_current_task_layout.setVisibility(View.VISIBLE);
                                fetch_task_layout.setVisibility(View.INVISIBLE);
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(MyCurrentTaskActivity.this, "Cannot connect to the server!", Toast.LENGTH_LONG).show();
                    }
                });
                requestQueue.add(stringRequest);
            }
        });
    }

    @Override
    protected void onResume() {
        super.onResume();

        sharedPreferences = getSharedPreferences("Driver", MODE_PRIVATE);
        has_task = sharedPreferences.getBoolean("task", false);

        if(has_task) {
            my_current_task_layout.setVisibility(View.VISIBLE);
            fetch_task_layout.setVisibility(View.INVISIBLE);
        }
        else {
            my_current_task_layout.setVisibility(View.INVISIBLE);
            fetch_task_layout.setVisibility(View.VISIBLE);
        }
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout_my_current_task);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        int id = item.getItemId();
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout_my_current_task);

        if (id == R.id.nav_home) {
            Intent intent = new Intent(MyCurrentTaskActivity.this, HomeActivity.class);
            startActivity(intent);
        }
        else if (id == R.id.nav_my_profile) {
            Intent intent = new Intent(MyCurrentTaskActivity.this, MyProfileActivity.class);
            startActivity(intent);
        }
        else if (id == R.id.nav_my_current_task) {
            drawer.closeDrawer(GravityCompat.START);
            return true;
        }
        else if (id == R.id.nav_my_task_history) {
            Intent intent = new Intent(MyCurrentTaskActivity.this, MyTaskHistoryActivity.class);
            startActivity(intent);
        }
        else if (id == R.id.nav_log_out) {
            Intent intent = new Intent(MyCurrentTaskActivity.this, LoginActivity.class);
            startActivity(intent);
        }

        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    private void setTaskData() {
//        orders = new ArrayList<Order>();
//        RequestQueue requestQueue = Volley.newRequestQueue(MyCurrentTaskActivity.this);
//        for (final String orderId : order_ids) {
//            String url = "http://35.236.103.93/api/driver/getOrderDetail";
//            StringRequest stringRequest = new StringRequest(Request.Method.POST, url, new Response.Listener<String>() {
//                @Override
//                public void onResponse(String response) {
//                    Toast.makeText(MyCurrentTaskActivity.this, response, Toast.LENGTH_LONG).show();
//                    try {
//                       task = new JSONObject(response);
//                       items = new ArrayList<Item>();
//                   } catch (JSONException e) {
//                        e.printStackTrace();
//                   }
//                }
//            }, new Response.ErrorListener() {
//                @Override
//                public void onErrorResponse(VolleyError error) {
//                    Toast.makeText(MyCurrentTaskActivity.this, "Cannot connect to the server!", Toast.LENGTH_LONG).show();
//                }
//            }) {
//                @Override
//                protected Map<String, String> getParams() {
//                    Map<String, String> params = new HashMap<String, String>();
//                    params.put("orders_id", orderId);
//                    return params;
//                }
//            };
//            requestQueue.add(stringRequest);
//        }

        orders = new ArrayList<Order>();
        items = new ArrayList<Item>();
        Item item = new Item("Chicken Nugget - 10 pieces", 2);
        items.add(item);
        item = new Item("Medium Coke", 2);
        items.add(item);
        String customer_address = "20500 Town Center Lane Unit 175, Cupertino, CA 95014";
        String[] customer_address_temp = customer_address.split(",");
        customer_address = customer_address_temp[0] + ",\n" + customer_address_temp[1] + "," + customer_address_temp[2];
        String restaurant_address = "1000 Restaurant Road, San Jose, CA 95124";
        String[] restaurant_address_temp = restaurant_address.split(",");
        restaurant_address = restaurant_address_temp[0] + ",\n" + restaurant_address_temp[1] + "," + restaurant_address_temp[2];
        Order order = new Order("Leo", customer_address, "McDonald's", restaurant_address,
                "100", items);
        orders.add(order);

        items = new ArrayList<Item>();
        item = new Item("Iced Venti Latte", 1);
        items.add(item);
        customer_address = "20500 Town Center Lane Unit 175, Cupertino, CA 95014";
        customer_address_temp = customer_address.split(",");
        customer_address = customer_address_temp[0] + ",\n" + customer_address_temp[1] + "," + customer_address_temp[2];
        restaurant_address = "400 De Anza Blvd, Cupertino, CA 95014";
        restaurant_address_temp = restaurant_address.split(",");
        restaurant_address = restaurant_address_temp[0] + ",\n" + restaurant_address_temp[1] + "," + restaurant_address_temp[2];
        order = new Order("Leo", customer_address, "Starbucks", restaurant_address,
                "123", items);
        orders.add(order);
    }

    public class CustomAdapter extends BaseAdapter {
        Context context;
        ArrayList<Order> orders;
        LayoutInflater inflater;

        public CustomAdapter(Context context, ArrayList<Order> orders) {
            this.context = context;
            this.orders = orders;
            inflater = LayoutInflater.from(context);
        }

        @Override
        public int getCount() {
            return orders.size();
        }

        @Override
        public Object getItem(int i) {
            return null;
        }

        @Override
        public long getItemId(int i) {
            return 0;
        }

        @Override
        public View getView(int i, View view, ViewGroup viewGroup) {
            view = inflater.inflate(R.layout.order_row, null);
            customer_name = (TextView) view.findViewById(R.id.order_row_customer_name);
            customer_address = (TextView) view.findViewById(R.id.order_row_customer_address);
            restaurant_name = (TextView) view.findViewById(R.id.order_row_restaurant_name);
            restaurant_address = (TextView) view.findViewById(R.id.order_row_restaurant_address);
            order_id = (TextView) view.findViewById(R.id.order_row_order_id);
            item_list = (TextView) view.findViewById(R.id.order_row_item_list);
            order_complete = (Button) view.findViewById(R.id.order_row_btn_complete);
            customer_name.setText(orders.get(i).getCustomerName());
            customer_address.setText(orders.get(i).getCustomerAddress());
            restaurant_name.setText(orders.get(i).getRestaurantName());
            restaurant_address.setText(orders.get(i).getRestaurantAddress());
            order_id.setText(orders.get(i).getOrderID());
            item_list.setText("");
            items = orders.get(i).getItems();
            for(int j = 0; j < items.size(); j++) {
                String temp = item_list.getText().toString() + "Item: " + items.get(j).getItemName() +
                              "\nQuantity: " + items.get(j).getQty() + "\n";
                item_list.setText(temp);
            }
            order_complete.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                }
            });
            return view;
        }
    }
}
