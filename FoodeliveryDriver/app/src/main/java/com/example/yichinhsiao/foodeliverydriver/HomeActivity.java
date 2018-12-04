package com.example.yichinhsiao.foodeliverydriver;

import android.content.Intent;
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
import android.view.MenuItem;
import android.view.View;

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
            String url = "https://www.google.com/maps/dir/?api=1&destination=20500+Town+Center" +
                    "+Lane+Unit+175+Cupertino+CA+95014&origin=My+Location&travelmode=driving&dir_action=navigate";
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            startActivity(intent);
//            drawer.closeDrawer(GravityCompat.START);
//            return true;
        }
        else if (id == R.id.nav_my_profile) {
            Intent intent = new Intent(HomeActivity.this, MyProfileActivity.class);
            startActivity(intent);
        }
        else if (id == R.id.nav_my_current_task) {
            Intent intent = new Intent(HomeActivity.this, MyCurrentTaskActivity.class);
            startActivity(intent);
        }
        else if (id == R.id.nav_pending_task_list) {
            Intent intent = new Intent(HomeActivity.this, PendingTaskListActivity.class);
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
