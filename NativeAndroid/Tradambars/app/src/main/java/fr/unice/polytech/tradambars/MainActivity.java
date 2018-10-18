package fr.unice.polytech.tradambars;

import android.Manifest;
import android.app.Activity;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.res.TypedArray;
import android.graphics.Color;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraManager;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import java.util.Calendar;

import android.app.AlarmManager;
import android.util.Log;
import android.util.TypedValue;
import android.view.View;
import android.widget.Button;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity implements SensorEventListener {

    private static final int CAMERA_REQUEST = 50;
    private SensorManager sensorManager;
    private Sensor lightSensor;

    private static boolean isNightModeActivated = false;
    private static boolean isTorchLightActivated = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //ActivityCompat.requestPermissions(MainActivity.this, new String[] {Manifest.permission.CAMERA}, CAMERA_REQUEST);

        if (isNightModeActivated)
            setTheme(R.style.ActivityTheme_Primary_Base_Dark);
        else
            setTheme(R.style.ActivityTheme_Primary_Base_Light);

        setContentView(R.layout.activity_main);

        final CameraManager cameraManager = (CameraManager)getSystemService(Context.CAMERA_SERVICE);

        final Button btnFlash = findViewById(R.id.btnFlash);

        if (isTorchLightActivated)
            btnFlash.setText(R.string.stopFlash);
        else
            btnFlash.setText(R.string.btn_activer_flash);

        if (isNightModeActivated || isTorchLightActivated)
            btnFlash.setVisibility(View.VISIBLE);
        else
            btnFlash.setVisibility(View.INVISIBLE);


        btnFlash.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                isTorchLightActivated = !isTorchLightActivated;
                try {
                    String cameraId = cameraManager.getCameraIdList()[0];
                    if (isTorchLightActivated)
                    {
                        btnFlash.setText(R.string.stopFlash);
                        cameraManager.setTorchMode(cameraId, true);
                    }
                    else
                    {
                        btnFlash.setText(R.string.btn_activer_flash);
                        cameraManager.setTorchMode(cameraId, false);
                        if (!isNightModeActivated)
                            btnFlash.setVisibility(View.INVISIBLE);
                    }
                } catch (CameraAccessException e) {
                    e.printStackTrace();
                }
            }
        });

        sensorManager = (SensorManager) this.getSystemService(SENSOR_SERVICE);
        assert sensorManager != null;
        lightSensor = sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT);

    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        switch (requestCode) {
            case CAMERA_REQUEST:
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {

                }
                else {
                    Toast.makeText(this, "Permission refusée pour le flash", Toast.LENGTH_LONG).show();
                }
        }
    }

    protected void onResume() {
        super.onResume();
        sensorManager.registerListener(this, lightSensor, SensorManager.SENSOR_DELAY_NORMAL);
    }

    protected void onPause() {
        super.onPause();
        sensorManager.unregisterListener(this);
    }

    public void onSensorChanged(SensorEvent event) {
        if (event.sensor.getType() == Sensor.TYPE_LIGHT) {
            float val = event.values[0];
            int light_threshold = getResources().getInteger(R.integer.light_threshold);
            if (val < light_threshold && !isNightModeActivated || val > light_threshold * 2 && isNightModeActivated) {
                isNightModeActivated = !isNightModeActivated;
                MainActivity.this.recreate();
            }
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {

    }

    @Override
    public void onPointerCaptureChanged(boolean hasCapture) {

    }
}
