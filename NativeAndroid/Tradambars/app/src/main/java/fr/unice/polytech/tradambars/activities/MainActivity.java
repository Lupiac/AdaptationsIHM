package fr.unice.polytech.tradambars.activities;

import android.Manifest;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.graphics.Typeface;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraManager;
import android.os.SystemClock;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import android.view.View;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import fr.unice.polytech.tradambars.R;
import fr.unice.polytech.tradambars.adapters.CarambarAdapter;
import fr.unice.polytech.tradambars.model.Carambar;

public class MainActivity extends AppCompatActivity implements SensorEventListener {

    private static final int CAMERA_REQUEST = 50;
    private SensorManager sensorManager;
    private Sensor lightSensor;

    private static boolean isNightModeActivated = false;
    private static boolean isTorchLightActivated = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        sensorManager = (SensorManager) getSystemService(SENSOR_SERVICE);
        lightSensor = sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT);

        if (isNightModeActivated)
            setTheme(R.style.ActivityTheme_Primary_Base_Dark);
        else
            setTheme(R.style.ActivityTheme_Primary_Base_Light);

        setContentView(R.layout.activity_main);

        final CameraManager cameraManager = (CameraManager) getSystemService(Context.CAMERA_SERVICE);

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
                if (view.getContext().getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA_FLASH)) {
                    isTorchLightActivated = !isTorchLightActivated;
                    try {
                        String cameraId = cameraManager.getCameraIdList()[0];
                        if (isTorchLightActivated) {
                            btnFlash.setText(R.string.stopFlash);
                            cameraManager.setTorchMode(cameraId, true);
                        } else {
                            btnFlash.setText(R.string.btn_activer_flash);
                            cameraManager.setTorchMode(cameraId, false);
                            if (!isNightModeActivated)
                                btnFlash.setVisibility(View.INVISIBLE);
                        }
                    } catch (CameraAccessException e) {
                        e.printStackTrace();
                    }
                }
            }
        });

        ArrayList<Carambar> dataSet = new ArrayList<>();
        Carambar c1 = new Carambar("Carambar Fraise", "Un super carambar à la fraise", R.drawable.fraise, 43.7, 7.2);
        Carambar c2 = new Carambar("Carambar Cola", "Très bon très bon", R.drawable.cola, 43.6, 7.0);
        Carambar c3 = new Carambar("Carambar Caramel", "Un carambar tout ce qu'il y a de plus classique", R.drawable.caramel, 48.8, 2.3);
        Carambar c4 = new Carambar("Carambar Xtreme", "Un carambar extreme pour les plus braves", R.drawable.xtreme, 46.19, 6.14);
        dataSet.add(c1);
        dataSet.add(c2);
        dataSet.add(c3);
        dataSet.add(c4);

        CarambarAdapter ca = new CarambarAdapter(this, dataSet);
        ListView listView = findViewById(R.id.carambarList);
        listView.setAdapter(ca);

        TextView title = (TextView) findViewById(R.id.app_title);
        Typeface font = Typeface.createFromAsset(getAssets(), "SignPainter_HouseScript.ttf");
        title.setTypeface(font);

    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        switch (requestCode) {
            case CAMERA_REQUEST:
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {

                } else {
                    Toast.makeText(this, "Permission refusée pour le flash", Toast.LENGTH_LONG).show();
                }
        }
    }

    protected void onResume() {
        super.onResume();
        if (sensorManager != null) {
            sensorManager.registerListener(this, lightSensor, SensorManager.SENSOR_DELAY_NORMAL);
        }
    }

    protected void onPause() {
        super.onPause();
        if (sensorManager != null)
            sensorManager.unregisterListener(this);
    }

    public void onSensorChanged(SensorEvent event) {
        if (event.sensor.getType() == Sensor.TYPE_LIGHT) {
            float val = event.values[0];
            int light_threshold = getResources().getInteger(R.integer.light_threshold);
            if (val < light_threshold && !isNightModeActivated || val > light_threshold * 3 && isNightModeActivated) {
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
