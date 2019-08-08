package com.example.voceseguro;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.widget.Toast;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

public class MyPositionActivity extends AppCompatActivity {

    private MapView mapView;
    private GoogleMap googleMap;

    private int LOCATION_MIN_DISTANCE = 20;
    private int LOCATION_MIN_TIME = 4000;

    private LocationManager locationManager;
    private LocationListener locationListener = new LocationListener() {
        @Override
        public void onLocationChanged(Location location) {
            drawMarker(location);
            locationManager.removeUpdates(locationListener);
        }

        @Override
        public void onStatusChanged(String s, int i, Bundle bundle) {

        }

        @Override
        public void onProviderEnabled(String s) {

        }

        @Override
        public void onProviderDisabled(String s) {

        }
    };


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my_position);

        mapView = findViewById(R.id.mapView);
        mapView.onCreate(savedInstanceState);
        mapView.getMapAsync(new OnMapReadyCallback() {
            @Override
            public void onMapReady(GoogleMap googleMap) {
                mapView_onMapReady(googleMap);
            }
        });

        locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        initMap();
        getCurrentLocation();
    }

    @Override
    protected void onResume() {
        super.onResume();
        mapView.onResume();
        getCurrentLocation();
    }

    @Override
    protected void onPause() {
        super.onPause();
        mapView.onPause();
        locationManager.removeUpdates(locationListener);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mapView.onDestroy();
    }

    private void mapView_onMapReady(GoogleMap googleMap) {
        this.googleMap = googleMap;
    }

    private void  initMap() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission
                .ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED || ContextCompat.checkSelfPermission
                (this, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                if(googleMap != null) {
                    googleMap.setMyLocationEnabled(true);
                    googleMap.getUiSettings().setMyLocationButtonEnabled(true);
                    googleMap.getUiSettings().setAllGesturesEnabled(true);
                }
        } else {
            if(ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                    != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this, new String[] {Manifest.permission
                .ACCESS_FINE_LOCATION}, 12);
            }
            if(ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION)
                    != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this, new String[] {Manifest.permission
                        .ACCESS_COARSE_LOCATION}, 13);
            }
        }
    }

    private void  getCurrentLocation() {
        if(ContextCompat.checkSelfPermission(this, Manifest.permission
        .ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED || ContextCompat.checkSelfPermission
                (this, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            boolean isGPSEnable = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
            boolean isNetworkEnable = locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);
            Location location = null;
            if(!isGPSEnable && !isNetworkEnable) {
                Toast.makeText(getApplicationContext(), getText(R.string.network_failed), Toast.LENGTH_LONG).show();
            } else {
                if(isGPSEnable) {
                    locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, LOCATION_MIN_TIME, LOCATION_MIN_DISTANCE, locationListener);
                    location = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
                }
                if(isNetworkEnable) {
                    locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, LOCATION_MIN_TIME, LOCATION_MIN_DISTANCE, locationListener);
                    location = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
                }
            }
            if(location != null) {
                drawMarker(location);
            }
        }
    }

    private void  drawMarker(Location location) {
        if(googleMap != null) {
            googleMap.clear();
            LatLng latLng = new LatLng(location.getLatitude(), location.getAltitude());
            googleMap.addMarker(new MarkerOptions()
                                    .position(latLng)
                                    .title(getText(R.string.i_am_here).toString())
                                );
            googleMap.animateCamera(CameraUpdateFactory.newLatLngZoom(latLng, 20));
        }
    }
}
