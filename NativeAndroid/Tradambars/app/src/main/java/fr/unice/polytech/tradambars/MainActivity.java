package fr.unice.polytech.tradambars;

import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import java.util.Calendar;

import android.app.AlarmManager;
import android.util.Log;
import android.view.View;
import android.widget.Switch;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity implements SensorEventListener {

    private SensorManager sensorManager;
    private Sensor lightSensor;
    private Context context;
    private View mainView;

    private Switch nightSwitch;

    private static boolean isNightModeActivated = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (isNightModeActivated)
            setTheme(R.style.ActivityTheme_Primary_Base_Dark);
        else
            setTheme(R.style.ActivityTheme_Primary_Base_Light);

        setContentView(R.layout.activity_main);
        mainView = findViewById(R.id.background);
        context = this.getApplicationContext();

        sensorManager = (SensorManager) this.getSystemService(SENSOR_SERVICE);
        assert sensorManager != null;
        lightSensor = sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT);

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
            if (val < light_threshold && !isNightModeActivated || val > light_threshold*2 && isNightModeActivated)
            {
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
