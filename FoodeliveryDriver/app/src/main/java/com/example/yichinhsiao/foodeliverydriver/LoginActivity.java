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

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class LoginActivity extends AppCompatActivity {

    EditText email, password;
    Button btn_login, btn_sign_up;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        email = (EditText) findViewById(R.id.login_email);
        password = (EditText) findViewById(R.id.login_password);
        btn_login = (Button) findViewById(R.id.login_btn_log_in);
        btn_sign_up = (Button) findViewById(R.id.login_btn_sign_up);

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

        btn_login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                RequestQueue requestQueue = Volley.newRequestQueue(LoginActivity.this);
                String url = "http://35.236.103.93/api/driver/login";
                StringRequest stringRequest = new StringRequest(Request.Method.POST, url, new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        if (response.length() == 0) {
                            Toast.makeText(LoginActivity.this, "Wrong email address or password", Toast.LENGTH_LONG).show();
                        }
                        else {
                            try {
                                JSONObject driver = new JSONObject(response);
                                SharedPreferences sharedPreferences = getSharedPreferences("Driver", MODE_PRIVATE);
                                sharedPreferences.edit().putInt("driver_id", driver.getInt("driver_id")).apply();
                                sharedPreferences.edit().putString("first_name", driver.getString("first_name")).apply();
                                sharedPreferences.edit().putString("last_name", driver.getString("last_name")).apply();
                                sharedPreferences.edit().putString("phone_number", driver.getString("phone_number")).apply();
                                sharedPreferences.edit().putString("email", driver.getString("email")).apply();
                                sharedPreferences.edit().putString("password", driver.getString("password")).apply();
                                sharedPreferences.edit().putString("license_plate", driver.getString("license_plate")).apply();
                                sharedPreferences.edit().putString("car_year", driver.getString("car_year")).apply();
                                sharedPreferences.edit().putString("car_made", driver.getString("car_made")).apply();
                                sharedPreferences.edit().putString("car_model", driver.getString("car_model")).apply();
                                sharedPreferences.edit().putString("car_submodel", driver.getString("car_submodel")).apply();
                                sharedPreferences.edit().putString("car_color", driver.getString("car_color")).apply();
                                sharedPreferences.edit().putBoolean("task", false).apply();
                                Intent intent = new Intent(LoginActivity.this, HomeActivity.class);
                                startActivity(intent);
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(LoginActivity.this, "Cannot connect to the server!", Toast.LENGTH_LONG).show();
                    }
                }) {
                    @Override
                    protected Map<String, String> getParams() {
                        Map<String, String> params = new HashMap<String, String>();
                        params.put("email", email.getText().toString().trim());
                        params.put("password", password.getText().toString().trim());
                        return params;
                    }
                };
                requestQueue.add(stringRequest);
            }
        });

        btn_sign_up.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(LoginActivity.this, SignupActivity.class);
                startActivity(intent);
            }
        });
    }

    protected void validateInput() {
        if(email.getText().toString().trim().length() > 0 &&
                password.getText().toString().trim().length() > 0) {
            btn_login.setEnabled(true);
        }
        else {
            btn_login.setEnabled(false);
        }
    }
}
