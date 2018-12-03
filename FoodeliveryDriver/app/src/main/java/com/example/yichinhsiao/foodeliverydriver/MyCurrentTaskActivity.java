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

public class MyCurrentTaskActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

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

        ConstraintLayout content = (ConstraintLayout) findViewById(R.id.content_my_current_task);
        content.setVisibility(View.VISIBLE);
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
        else if (id == R.id.nav_pending_task_list) {
            Intent intent = new Intent(MyCurrentTaskActivity.this, PendingTaskListActivity.class);
            startActivity(intent);
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
}
