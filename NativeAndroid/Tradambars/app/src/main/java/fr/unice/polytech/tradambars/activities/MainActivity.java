package fr.unice.polytech.tradambars.activities;

import android.content.pm.PackageManager;
import android.graphics.Typeface;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import java.util.ArrayList;

import android.widget.ListView;
import android.widget.SeekBar;
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

    private SeekBar radius;
    private TextView radius_value;

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

        radius_value = findViewById(R.id.radius_value);
        radius = findViewById(R.id.radius_seekbar);
        radius_value.setText("Rayon de recherche: "+radius.getProgress()+" KM");
        radius.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int i, boolean b) {
                radius.setProgress(i);
                radius_value.setText("Rayon de recherche: "+i+" KM");
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

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
        Typeface titleFont = Typeface.createFromAsset(getAssets(), "SignPainter_HouseScript.ttf");
        title.setTypeface(titleFont);

        Typeface textFont = Typeface.createFromAsset(getAssets(), "Lato-Light.ttf");
        radius_value.setTypeface(textFont);

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
