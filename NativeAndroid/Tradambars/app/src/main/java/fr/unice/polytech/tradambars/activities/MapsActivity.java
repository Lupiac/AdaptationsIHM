package fr.unice.polytech.tradambars.activities;

import android.Manifest;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.AsyncTask;
import android.os.Handler;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AlertDialog;
import android.util.Log;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.google.android.gms.maps.CameraUpdate;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.LatLngBounds;
import com.google.android.gms.maps.model.MapStyleOptions;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;

import java.util.ArrayList;
import java.util.List;

import fr.unice.polytech.tradambars.R;
import fr.unice.polytech.tradambars.model.Carambar;
import fr.unice.polytech.tradambars.tasks.DownloadTask;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback,
        SensorEventListener, LocationListener {

    private GoogleMap mMap;
    private Carambar carambar;

    private SensorManager sensorManager;
    private Sensor lightSensor;
    private static boolean isNightModeActivated;

    public static final int MY_PERMISSIONS_REQUEST_LOCATION = 99;

    private LatLng userLocation, carambarPos;

    private Marker userLocationMarker;
    private Marker carambarPosMarker;
    private Marker thirdCornerMarker;
    private Marker fourthCornerMarker;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);

        checkLocationPermission();

        sensorManager = (SensorManager) getSystemService(SENSOR_SERVICE);
        lightSensor = sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT);

        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
        Intent intent = getIntent();
        carambar = (Carambar) intent.getSerializableExtra("carambar");

    }


    public boolean checkLocationPermission() {
        if (ContextCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {

            if (ActivityCompat.shouldShowRequestPermissionRationale(this,
                    Manifest.permission.ACCESS_FINE_LOCATION)) {

                new AlertDialog.Builder(this)
                        .setTitle("Google maps")
                        .setMessage("Tradambars a besoin de votre position")
                        .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialogInterface, int i) {
                                //Prompt the user once explanation has been shown
                                ActivityCompat.requestPermissions(MapsActivity.this,
                                        new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                                        MY_PERMISSIONS_REQUEST_LOCATION);
                            }
                        })
                        .create()
                        .show();


            } else {
                ActivityCompat.requestPermissions(this,
                        new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                        MY_PERMISSIONS_REQUEST_LOCATION);
            }
            return false;
        } else {
            return true;
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           String permissions[], int[] grantResults) {
        switch (requestCode) {
            case MY_PERMISSIONS_REQUEST_LOCATION: {
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    if (ContextCompat.checkSelfPermission(this,
                            Manifest.permission.ACCESS_FINE_LOCATION)
                            == PackageManager.PERMISSION_GRANTED) {
                        mMap.setMyLocationEnabled(true);
                    }
                } else {
                    mMap.setMyLocationEnabled(false);
                }
            }

        }
    }


    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;

        if (isNightModeActivated)
            mMap.setMapStyle(MapStyleOptions.loadRawResourceStyle(
                    this, R.raw.map_night_mode));

        // Add a marker in Sydney and move the camera
        carambarPos = new LatLng(carambar.getLat(), carambar.getLng());
        carambarPosMarker = mMap.addMarker(new MarkerOptions().position(carambarPos).title(carambar.getName()));
        carambarPosMarker.showInfoWindow();

        if (ContextCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_FINE_LOCATION)
                == PackageManager.PERMISSION_GRANTED) {
            mMap.setMyLocationEnabled(true);

            LocationManager service = (LocationManager) getSystemService(LOCATION_SERVICE);
            Criteria criteria = new Criteria();
            String provider = service.getBestProvider(criteria, false);
            Location location = service.getLastKnownLocation(provider);
            userLocation = new LatLng(location.getLatitude(), location.getLongitude());

            LatLng middle = middleBetween(userLocation, carambarPos);

            LatLng halfDiagonal = new LatLng((userLocation.latitude - carambarPos.latitude) / 2,
                    (userLocation.longitude - carambarPos.longitude) / 2);

            final LatLng thirdCorner = new LatLng(middle.latitude - halfDiagonal.longitude,
                    middle.longitude + halfDiagonal.latitude);

            final LatLng fourthCorner = new LatLng(middle.latitude + halfDiagonal.longitude,
                    middle.longitude - halfDiagonal.latitude);

            thirdCornerMarker = mMap.addMarker(new MarkerOptions().position(thirdCorner).title(carambar.getName()).visible(false));
            fourthCornerMarker = mMap.addMarker(new MarkerOptions().position(fourthCorner).title(carambar.getName()).visible(false));
            userLocationMarker = mMap.addMarker(new MarkerOptions().position(userLocation).title(carambar.getName()).visible(false));

            mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(middle, 5f));

            String dirUrl = getDirectionsUrl(userLocation, carambarPos);
            DownloadTask downloadTask = new DownloadTask(mMap);
            downloadTask.execute(dirUrl);

            LinearLayout mapLayout = findViewById(R.id.map_layout);
            mapLayout.post(new Runnable() {
                @Override
                public void run() {
                    LatLngBounds.Builder builder = new LatLngBounds.Builder();
                    builder.include(userLocationMarker.getPosition());
                    builder.include(carambarPosMarker.getPosition());
                    builder.include(thirdCornerMarker.getPosition());
                    builder.include(fourthCornerMarker.getPosition());
                    LatLngBounds bounds = builder.build();
                    int padding = 100;

                    mMap.animateCamera(CameraUpdateFactory.newLatLngBounds(bounds, padding));
                }
            });

        } else {
            mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(carambarPos, 16f));
            mMap.setMyLocationEnabled(false);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (sensorManager != null) {
            sensorManager.registerListener(this, lightSensor, SensorManager.SENSOR_DELAY_NORMAL);
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (ContextCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_FINE_LOCATION)
                == PackageManager.PERMISSION_GRANTED) {
        }
        if (sensorManager != null)
            sensorManager.unregisterListener(this);
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        if (event.sensor.getType() == Sensor.TYPE_LIGHT) {
            float val = event.values[0];
            int light_threshold = getResources().getInteger(R.integer.light_threshold);
            if (val < light_threshold && !isNightModeActivated || val > light_threshold * 3 && isNightModeActivated) {
                isNightModeActivated = !isNightModeActivated;
                MapsActivity.this.recreate();
            }
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {

    }

    private LatLng middleBetween(LatLng pos1, LatLng pos2) {
        return new LatLng((pos1.latitude + pos2.latitude) / 2, (pos1.longitude + pos2.longitude) / 2);
    }


    private String getDirectionsUrl(LatLng origin, LatLng dest) {
        String str_origin = "origin=" + origin.latitude + "," + origin.longitude;
        String str_dest = "destination=" + dest.latitude + "," + dest.longitude;
        String sensor = "sensor=false";
        String parameters = str_origin + "&" + str_dest + "&" + sensor;
        String output = "json";
        return "https://maps.googleapis.com/maps/api/directions/" + output + "?" + parameters +
                "&key=AIzaSyCQER8F66m6JrAsT5nOln_BQ2aFVol9oBw";
    }

    @Override
    public void onLocationChanged(Location location) {
        Toast.makeText(this, "LOCATION CHANGED", Toast.LENGTH_LONG).show();
        userLocation = new LatLng(location.getLatitude(), location.getLongitude());
        String dirUrl = getDirectionsUrl(userLocation, carambarPos);
        DownloadTask downloadTask = new DownloadTask(mMap);
        downloadTask.execute(dirUrl);
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
}
