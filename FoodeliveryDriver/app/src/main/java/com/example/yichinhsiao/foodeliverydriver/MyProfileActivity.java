package com.example.yichinhsiao.foodeliverydriver;

import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.constraint.ConstraintLayout;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class MyProfileActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

    int driver_id;
    String unencry_password;
    TextView first_name, last_name, phone_number, email, password, license_plate, year, make, model,
             sub_model, color;
    Button btn_update_profile, btn_update_password, btn_update_car_registration;
    EditText update_first_name, update_last_name, update_phone_number, original_password, new_password,
             confirm_password, update_license_plate, update_year, update_make, update_model, update_sub_model,
             update_color;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my_profile);
        MyProfileActivity.this.setTitle(R.string.my_profile);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout_my_profile);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

        ConstraintLayout content = (ConstraintLayout) findViewById(R.id.content_my_profile);
        content.setVisibility(View.VISIBLE);

        first_name = (TextView) findViewById(R.id.my_profile_first_name);
        last_name = (TextView) findViewById(R.id.my_profile_last_name);
        phone_number = (TextView) findViewById(R.id.my_profile_phone_number);
        email = (TextView) findViewById(R.id.my_profile_email);
        password = (TextView) findViewById(R.id.my_profile_password);
        license_plate = (TextView) findViewById(R.id.my_profile_license_plate);
        year = (TextView) findViewById(R.id.my_profile_year);
        make = (TextView) findViewById(R.id.my_profile_make);
        model = (TextView) findViewById(R.id.my_profile_model);
        sub_model = (TextView) findViewById(R.id.my_profile_sub_model);
        color = (TextView) findViewById(R.id.my_profile_color);
        btn_update_profile = (Button) findViewById(R.id.my_profile_btn_update_profile);
        btn_update_password = (Button) findViewById(R.id.my_profile_btn_update_password);
        btn_update_car_registration = (Button) findViewById(R.id.my_profile_btn_car_registration);

        initData();

        btn_update_profile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                LayoutInflater inflater = getLayoutInflater();
                View dialogLayout = inflater.inflate(R.layout.update_profile, (ViewGroup)null);
                AlertDialog.Builder builder = new AlertDialog.Builder(MyProfileActivity.this);
                builder.setView(dialogLayout);
                builder.setCancelable(false);
                update_first_name = (EditText) dialogLayout.findViewById(R.id.update_profile_first_name);
                update_last_name = (EditText) dialogLayout.findViewById(R.id.update_profile_last_name);
                update_phone_number = (EditText) dialogLayout.findViewById(R.id.update_profile_phone_number);
                update_first_name.setText(first_name.getText().toString());
                update_last_name.setText(last_name.getText().toString());
                update_phone_number.setText(phone_number.getText().toString());
                builder.setPositiveButton("Update", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                    }
                });
                builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.cancel();
                    }
                });
                final AlertDialog dialog = builder.create();
                Objects.requireNonNull(dialog.getWindow())
                        .setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
                dialog.show();
                dialog.getButton(AlertDialog.BUTTON_POSITIVE).setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        if(update_first_name.getText().toString().trim().length() == 0 ||
                                update_last_name.getText().toString().trim().length() == 0 ||
                                update_phone_number.getText().toString().trim().length() == 0) {
                            Toast.makeText(MyProfileActivity.this, "Cannot have blank", Toast.LENGTH_LONG).show();
                        }
                        else {
                            RequestQueue requestQueue = Volley.newRequestQueue(MyProfileActivity.this);
                            String url = "http://35.236.103.93/api/driver/updateProfile";
                            StringRequest stringRequest = new StringRequest(Request.Method.POST, url, new Response.Listener<String>() {
                                @Override
                                public void onResponse(String response) {
                                    if(response.equals("updated")) {
                                        first_name.setText(update_first_name.getText().toString().trim());
                                        last_name.setText(update_last_name.getText().toString().trim());
                                        phone_number.setText(update_phone_number.getText().toString().trim());
                                        SharedPreferences sharedPreferences = getSharedPreferences("Driver", MODE_PRIVATE);
                                        sharedPreferences.edit().putString("first_name", first_name.getText().toString()).apply();
                                        sharedPreferences.edit().putString("last_name", last_name.getText().toString()).apply();
                                        sharedPreferences.edit().putString("phone_number", phone_number.getText().toString()).apply();
                                        Toast.makeText(MyProfileActivity.this, "Updated successfully", Toast.LENGTH_LONG).show();
                                        dialog.cancel();
                                    }
                                    else {
                                        Toast.makeText(MyProfileActivity.this, "Something goes wrong. Please try again later!", Toast.LENGTH_LONG).show();
                                    }
                                }
                            }, new Response.ErrorListener() {
                                @Override
                                public void onErrorResponse(VolleyError error) {
                                    Toast.makeText(MyProfileActivity.this, "Cannot connect to the server!", Toast.LENGTH_LONG).show();
                                }
                            }) {
                                @Override
                                protected Map<String, String> getParams() {
                                    Map<String, String> params = new HashMap<String, String>();
                                    params.put("driver_id", String.valueOf(driver_id));
                                    params.put("first_name", update_first_name.getText().toString().trim());
                                    params.put("last_name", update_last_name.getText().toString().trim());
                                    params.put("phone_number", update_phone_number.getText().toString().trim());
                                    return params;
                                }
                            };
                            requestQueue.add(stringRequest);
                        }
                    }
                });
            }
        });

        btn_update_password.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                LayoutInflater inflater = getLayoutInflater();
                View dialogLayout = inflater.inflate(R.layout.update_password, (ViewGroup)null);
                AlertDialog.Builder builder = new AlertDialog.Builder(MyProfileActivity.this);
                builder.setView(dialogLayout);
                builder.setCancelable(false);
                original_password = (EditText) dialogLayout.findViewById(R.id.update_password_original_password);
                new_password = (EditText) dialogLayout.findViewById(R.id.update_password_new_password);
                confirm_password = (EditText) dialogLayout.findViewById(R.id.update_password_confirm_password);
                builder.setPositiveButton("Update", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                    }
                });
                builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.cancel();
                    }
                });
                final AlertDialog dialog = builder.create();
                Objects.requireNonNull(dialog.getWindow())
                        .setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
                dialog.show();
                dialog.getButton(AlertDialog.BUTTON_POSITIVE).setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        if(original_password.getText().toString().trim().length() == 0 ||
                                new_password.getText().toString().trim().length() == 0 ||
                                confirm_password.getText().toString().trim().length() == 0) {
                            Toast.makeText(MyProfileActivity.this, "Cannot have blank", Toast.LENGTH_LONG).show();
                        }
                        else if(!original_password.getText().toString().trim().equals(unencry_password)) {
                            Toast.makeText(MyProfileActivity.this, "Original password is incorrect", Toast.LENGTH_LONG).show();
                        }
                        else if(!new_password.getText().toString().trim()
                                .equals(confirm_password.getText().toString().trim())) {
                            Toast.makeText(MyProfileActivity.this, "Passwords are different", Toast.LENGTH_LONG).show();
                        }
                        else {
                            RequestQueue requestQueue = Volley.newRequestQueue(MyProfileActivity.this);
                            String url = "http://35.236.103.93/api/driver/updatePassword";
                            StringRequest stringRequest = new StringRequest(Request.Method.POST, url, new Response.Listener<String>() {
                                @Override
                                public void onResponse(String response) {
                                    if(response.equals("updated")) {
                                        unencry_password = confirm_password.getText().toString().trim();
                                        String encry_password = "";
                                        for(int i = 0; i < unencry_password.length(); i++) {
                                            encry_password = encry_password.concat("*");
                                        }
                                        password.setText(encry_password);
                                        SharedPreferences sharedPreferences = getSharedPreferences("Driver", MODE_PRIVATE);
                                        sharedPreferences.edit().putString("password", password.getText().toString()).apply();
                                        Toast.makeText(MyProfileActivity.this, "Updated successfully", Toast.LENGTH_LONG).show();
                                        dialog.cancel();
                                    }
                                    else {
                                        Toast.makeText(MyProfileActivity.this, "Something goes wrong. Please try again later!", Toast.LENGTH_LONG).show();
                                    }
                                }
                            }, new Response.ErrorListener() {
                                @Override
                                public void onErrorResponse(VolleyError error) {
                                    Toast.makeText(MyProfileActivity.this, "Cannot connect to the server!", Toast.LENGTH_LONG).show();
                                }
                            }) {
                                @Override
                                protected Map<String, String> getParams() {
                                    Map<String, String> params = new HashMap<String, String>();
                                    params.put("driver_id", String.valueOf(driver_id));
                                    params.put("password", confirm_password.getText().toString().trim());
                                    return params;
                                }
                            };
                            requestQueue.add(stringRequest);
                        }
                    }
                });
            }
        });

        btn_update_car_registration.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                LayoutInflater inflater = getLayoutInflater();
                View dialogLayout = inflater.inflate(R.layout.update_car_registration, (ViewGroup)null);
                AlertDialog.Builder builder = new AlertDialog.Builder(MyProfileActivity.this);
                builder.setView(dialogLayout);
                builder.setCancelable(false);
                update_license_plate = (EditText) dialogLayout.findViewById(R.id.update_car_registration_license_plate);
                update_year = (EditText) dialogLayout.findViewById(R.id.update_car_registration_year);
                update_make = (EditText) dialogLayout.findViewById(R.id.update_car_registration_make);
                update_model = (EditText) dialogLayout.findViewById(R.id.update_car_registration_model);
                update_sub_model = (EditText) dialogLayout.findViewById(R.id.update_car_registration_sub_model);
                update_color = (EditText) dialogLayout.findViewById(R.id.update_car_registration_color);
                update_license_plate.setText(license_plate.getText().toString());
                update_year.setText(year.getText().toString());
                update_make.setText(make.getText().toString());
                update_model.setText(model.getText().toString());
                update_sub_model.setText(sub_model.getText().toString());
                update_color.setText(color.getText().toString());
                builder.setPositiveButton("Update", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                    }
                });
                builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.cancel();
                    }
                });
                final AlertDialog dialog = builder.create();
                Objects.requireNonNull(dialog.getWindow())
                        .setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
                dialog.show();
                dialog.getButton(AlertDialog.BUTTON_POSITIVE).setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        if(update_license_plate.getText().toString().trim().length() == 0 ||
                                update_year.getText().toString().trim().length() == 0 ||
                                update_make.getText().toString().trim().length() == 0 ||
                                update_model.getText().toString().trim().length() == 0 ||
                                update_sub_model.getText().toString().trim().length() == 0 ||
                                update_color.getText().toString().trim().length() == 0) {
                            Toast.makeText(MyProfileActivity.this, "Cannot have blank", Toast.LENGTH_LONG).show();
                        }
                        else {
                            RequestQueue requestQueue = Volley.newRequestQueue(MyProfileActivity.this);
                            String url = "http://35.236.103.93/api/driver/updateCarRegistration";
                            StringRequest stringRequest = new StringRequest(Request.Method.POST, url, new Response.Listener<String>() {
                                @Override
                                public void onResponse(String response) {
                                    if(response.equals("updated")) {
                                        license_plate.setText(update_license_plate.getText().toString().trim());
                                        year.setText(update_year.getText().toString().trim());
                                        make.setText(update_make.getText().toString().trim());
                                        model.setText(update_model.getText().toString().trim());
                                        sub_model.setText(update_sub_model.getText().toString().trim());
                                        color.setText(update_color.getText().toString().trim());
                                        SharedPreferences sharedPreferences = getSharedPreferences("Driver", MODE_PRIVATE);
                                        sharedPreferences.edit().putString("license_plate", license_plate.getText().toString()).apply();
                                        sharedPreferences.edit().putString("car_year", year.getText().toString()).apply();
                                        sharedPreferences.edit().putString("car_made", make.getText().toString()).apply();
                                        sharedPreferences.edit().putString("car_model", model.getText().toString()).apply();
                                        sharedPreferences.edit().putString("car_submodel", sub_model.getText().toString()).apply();
                                        sharedPreferences.edit().putString("car_color", color.getText().toString()).apply();
                                        Toast.makeText(MyProfileActivity.this, "Updated successfully", Toast.LENGTH_LONG).show();
                                        dialog.cancel();
                                    }
                                    else {
                                        Toast.makeText(MyProfileActivity.this, "Something goes wrong. Please try again later!", Toast.LENGTH_LONG).show();
                                    }
                                }
                            }, new Response.ErrorListener() {
                                @Override
                                public void onErrorResponse(VolleyError error) {
                                    Toast.makeText(MyProfileActivity.this, "Cannot connect to the server!", Toast.LENGTH_LONG).show();
                                }
                            }) {
                                @Override
                                protected Map<String, String> getParams() {
                                    Map<String, String> params = new HashMap<String, String>();
                                    params.put("driver_id", String.valueOf(driver_id));
                                    params.put("license_plate", update_license_plate.getText().toString().trim());
                                    params.put("car_year", update_year.getText().toString().trim());
                                    params.put("car_made", update_make.getText().toString().trim());
                                    params.put("car_model", update_model.getText().toString().trim());
                                    params.put("car_submodel", update_sub_model.getText().toString().trim());
                                    params.put("car_color", update_color.getText().toString().trim());
                                    return params;
                                }
                            };
                            requestQueue.add(stringRequest);
                        }
                    }
                });
            }
        });
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout_my_profile);
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
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout_my_profile);

        if (id == R.id.nav_home) {
            Intent intent = new Intent(MyProfileActivity.this, HomeActivity.class);
            startActivity(intent);
        }
        else if (id == R.id.nav_my_profile) {
            drawer.closeDrawer(GravityCompat.START);
            return true;
        }
        else if (id == R.id.nav_my_current_task) {
            Intent intent = new Intent(MyProfileActivity.this, MyCurrentTaskActivity.class);
            startActivity(intent);
        }
        else if (id == R.id.nav_my_task_history) {
            Intent intent = new Intent(MyProfileActivity.this, MyTaskHistoryActivity.class);
            startActivity(intent);
        }
        else if (id == R.id.nav_log_out) {
            Intent intent = new Intent(MyProfileActivity.this, LoginActivity.class);
            startActivity(intent);
        }

        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    private void initData() {
        SharedPreferences sharedPreferences = getSharedPreferences("Driver", MODE_PRIVATE);
        driver_id = sharedPreferences.getInt("driver_id", 0);
        first_name.setText(sharedPreferences.getString("first_name", "Error"));
        last_name.setText(sharedPreferences.getString("last_name", "Error"));
        phone_number.setText(sharedPreferences.getString("phone_number", "Error"));
        email.setText(sharedPreferences.getString("email", "Error"));
        password.setText(sharedPreferences.getString("password", "Error"));
        license_plate.setText(sharedPreferences.getString("license_plate", "Error"));
        year.setText(sharedPreferences.getString("car_year", "Error"));
        make.setText(sharedPreferences.getString("car_made", "Error"));
        model.setText(sharedPreferences.getString("car_model", "Error"));
        sub_model.setText(sharedPreferences.getString("car_submodel", "Error"));
        color.setText(sharedPreferences.getString("car_color", "Error"));

        unencry_password = password.getText().toString();
        String encry_password = "";
        for(int i = 0; i < unencry_password.length(); i++) {
            encry_password = encry_password.concat("*");
        }
        password.setText(encry_password);
    }
}
