package com.example.yichinhsiao.foodeliverydriver;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import java.util.HashMap;
import java.util.Map;

public class SignupActivity extends AppCompatActivity {

    EditText first_name, last_name, phone_number, email, password, license_plate, year, make, model,
             sub_model, color;
    Button btn_sign_up, btn_login;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        first_name = (EditText) findViewById(R.id.sign_up_first_name);
        last_name = (EditText) findViewById(R.id.sign_up_last_name);
        phone_number = (EditText) findViewById(R.id.sign_up_phone_number);
        email = (EditText) findViewById(R.id.sign_up_email);
        password = (EditText) findViewById(R.id.sign_up_password);
        license_plate = (EditText) findViewById(R.id.sign_up_license_plate);
        year = (EditText) findViewById(R.id.sign_up_year);
        make = (EditText) findViewById(R.id.sign_up_make);
        model = (EditText) findViewById(R.id.sign_up_model);
        sub_model = (EditText) findViewById(R.id.sign_up_sub_model);
        color = (EditText) findViewById(R.id.sign_up_color);
        btn_sign_up = (Button) findViewById(R.id.sign_up_btn_sign_up);
        btn_login = (Button) findViewById(R.id.sign_up_btn_log_in);

        first_name.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                validateInput();
            }
        });

        last_name.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                validateInput();
            }
        });

        phone_number.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                validateInput();
            }
        });

        email.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                validateInput();
            }
        });

        password.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                validateInput();
            }
        });

        license_plate.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                validateInput();
            }
        });

        year.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                validateInput();
            }
        });

        make.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                validateInput();
            }
        });

        model.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                validateInput();
            }
        });

        sub_model.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                validateInput();
            }
        });

        color.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                validateInput();
            }
        });

        btn_sign_up.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                RequestQueue requestQueue = Volley.newRequestQueue(SignupActivity.this);
                String url = "http://35.236.103.93/api/driver/signup";
                StringRequest stringRequest = new StringRequest(Request.Method.POST, url, new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        switch (response) {
                            case "existed":
                                Toast.makeText(SignupActivity.this, "Email address already existed", Toast.LENGTH_LONG).show();
                                break;
                            case "error":
                                Toast.makeText(SignupActivity.this, "Cannot sign up, please check your information", Toast.LENGTH_LONG).show();
                                break;
                            default:
                                SharedPreferences sharedPreferences = getSharedPreferences("Driver", MODE_PRIVATE);
                                sharedPreferences.edit().putInt("driver_id", Integer.parseInt(response)).apply();
                                sharedPreferences.edit().putString("first_name", first_name.getText().toString().trim()).apply();
                                sharedPreferences.edit().putString("last_name", last_name.getText().toString().trim()).apply();
                                sharedPreferences.edit().putString("phone_number", phone_number.getText().toString().trim()).apply();
                                sharedPreferences.edit().putString("email", email.getText().toString().trim()).apply();
                                sharedPreferences.edit().putString("password", password.getText().toString().trim()).apply();
                                sharedPreferences.edit().putString("license_plate", license_plate.getText().toString().trim()).apply();
                                sharedPreferences.edit().putString("car_year", year.getText().toString().trim()).apply();
                                sharedPreferences.edit().putString("car_made", make.getText().toString().trim()).apply();
                                sharedPreferences.edit().putString("car_model", model.getText().toString().trim()).apply();
                                sharedPreferences.edit().putString("car_submodel", sub_model.getText().toString().trim()).apply();
                                sharedPreferences.edit().putString("car_color", color.getText().toString().trim()).apply();
                                sharedPreferences.edit().putBoolean("task", false).apply();
                                Intent intent = new Intent(SignupActivity.this, HomeActivity.class);
                                startActivity(intent);
                                break;
                        }
                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(SignupActivity.this, "Cannot connect to the server!", Toast.LENGTH_LONG).show();
                    }
                }) {
                    @Override
                    protected Map<String, String> getParams() {
                        Map<String, String> params = new HashMap<String, String>();
                        params.put("first_name", first_name.getText().toString().trim());
                        params.put("last_name", last_name.getText().toString().trim());
                        params.put("phone_number", phone_number.getText().toString().trim());
                        params.put("email", email.getText().toString().trim());
                        params.put("password", password.getText().toString().trim());
                        params.put("license_plate", license_plate.getText().toString().trim());
                        params.put("car_year", year.getText().toString().trim());
                        params.put("car_made", make.getText().toString().trim());
                        params.put("car_model", model.getText().toString().trim());
                        params.put("car_submodel", sub_model.getText().toString().trim());
                        params.put("car_color", color.getText().toString().trim());
                        return params;
                    }
                };
                requestQueue.add(stringRequest);
            }
        });

        btn_login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(SignupActivity.this, LoginActivity.class);
                startActivity(intent);
            }
        });
    }

    protected void validateInput() {
        if(first_name.getText().toString().trim().length() > 0 &&
                last_name.getText().toString().trim().length() > 0 &&
                phone_number.getText().toString().trim().length() > 0 &&
                email.getText().toString().trim().length() > 0 &&
                password.getText().toString().trim().length() > 0 &&
                license_plate.getText().toString().trim().length() > 0 &&
                year.getText().toString().trim().length() > 0 &&
                make.getText().toString().trim().length() > 0 &&
                model.getText().toString().trim().length() > 0 &&
                sub_model.getText().toString().trim().length() > 0 &&
                color.getText().toString().trim().length() > 0) {
            btn_sign_up.setEnabled(true);
        }
        else {
            btn_sign_up.setEnabled(false);
        }
    }
}
