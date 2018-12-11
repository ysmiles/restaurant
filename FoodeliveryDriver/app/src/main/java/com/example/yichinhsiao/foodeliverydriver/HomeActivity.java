package com.example.yichinhsiao.foodeliverydriver;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.constraint.ConstraintLayout;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

public class HomeActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        HomeActivity.this.setTitle(R.string.home);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout_home);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

        ConstraintLayout content = (ConstraintLayout) findViewById(R.id.content_home);
        content.setVisibility(View.VISIBLE);

        Button btn_my_profile = (Button) findViewById(R.id.home_btn_my_profile);
        Button btn_my_current_task = (Button) findViewById(R.id.home_btn_my_current_task);
        Button btn_my_task_history = (Button) findViewById(R.id.home_btn_my_task_history);

        btn_my_profile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(HomeActivity.this, MyProfileActivity.class);
                startActivity(intent);
            }
        });

        btn_my_current_task.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(HomeActivity.this, MyCurrentTaskActivity.class);
                startActivity(intent);
            }
        });

        btn_my_task_history.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                RequestQueue requestQueue = Volley.newRequestQueue(HomeActivity.this);
                String url = "http://35.236.103.93/api/routes/restart";
                StringRequest stringRequest = new StringRequest(Request.Method.GET, url, new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Toast.makeText(HomeActivity.this, response, Toast.LENGTH_LONG).show();
                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(HomeActivity.this, "Cannot connect to the server!", Toast.LENGTH_LONG).show();
                    }
                });
                requestQueue.add(stringRequest);
//                Intent intent = new Intent(HomeActivity.this, MyTaskHistoryActivity.class);
//                startActivity(intent);
            }
        });
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout_home);
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
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout_home);

        if (id == R.id.nav_home) {
            drawer.closeDrawer(GravityCompat.START);
            return true;
        }
        else if (id == R.id.nav_my_profile) {
            Intent intent = new Intent(HomeActivity.this, MyProfileActivity.class);
            startActivity(intent);
        }
        else if (id == R.id.nav_my_current_task) {
            Intent intent = new Intent(HomeActivity.this, MyCurrentTaskActivity.class);
            startActivity(intent);
        }
        else if (id == R.id.nav_my_task_history) {
            Intent intent = new Intent(HomeActivity.this, MyTaskHistoryActivity.class);
            startActivity(intent);
        }
        else if (id == R.id.nav_log_out) {
            Intent intent = new Intent(HomeActivity.this, LoginActivity.class);
            startActivity(intent);
        }

        drawer.closeDrawer(GravityCompat.START);
        return true;
    }
}
