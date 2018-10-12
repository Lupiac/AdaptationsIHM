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
import android.view.View;
import android.widget.Switch;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity implements SensorEventListener {

    private SensorManager sensorManager;
    private Sensor lightSensor;
    private Context context;
    private View mainView;

    private AlarmManager alarmManager;
    private PendingIntent alarmIntent;
    private Calendar calendar;

    private Switch nightSwitch;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mainView = findViewById(R.id.background);
        context = this.getApplicationContext();
        nightSwitch = findViewById(R.id.nightSwitch);

        nightSwitch.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (nightSwitch.isChecked())
                    mainView.setAlpha(1f);
                else
                    mainView.setAlpha(0f);
            }
        });

        sensorManager = (SensorManager)this.getSystemService(SENSOR_SERVICE);
        lightSensor = sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT);


        /*alarmManager = (AlarmManager)context.getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(context, AlarmReceiver.class);
        alarmIntent = PendingIntent.getBroadcast(context, 0, intent, 0);

        calendar = Calendar.getInstance();
        calendar.setTimeInMillis(System.currentTimeMillis());
        calendar.set(Calendar.HOUR_OF_DAY, 18);
        calendar.set(Calendar.MINUTE, 0);

        alarmManager.setRepeating(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(),
                AlarmManager.INTERVAL_DAY, alarmIntent);*/
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
        if (event.sensor.getType() == Sensor.TYPE_LIGHT)
        {
            float val = event.values[0];
            float backgroundStatus = mainView.getAlpha();
            if (val < 15 && backgroundStatus == 0f) { // Dark mode
                mainView.setAlpha(1f);
            }
            else if (val >= 15 && backgroundStatus == 1f)
            {
                mainView.setAlpha(0f);
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
