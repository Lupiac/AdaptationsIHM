package fr.unice.polytech.tradambars.adapters;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Typeface;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.support.v4.content.ContextCompat;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.maps.model.LatLng;

import java.util.ArrayList;

import fr.unice.polytech.tradambars.R;
import fr.unice.polytech.tradambars.activities.MapsActivity;
import fr.unice.polytech.tradambars.model.Carambar;

import static android.content.Context.LOCATION_SERVICE;


public class CarambarAdapter extends ArrayAdapter<Carambar> {
    public CarambarAdapter(Context context, ArrayList<Carambar> users) {
        super(context, 0, users);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // Get the data item for this position
        final Carambar carambar = getItem(position);
        // Check if an existing view is being reused, otherwise inflate the view
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.row, parent, false);
        }

        if (ContextCompat.checkSelfPermission(getContext(),
                Manifest.permission.ACCESS_FINE_LOCATION)
                == PackageManager.PERMISSION_GRANTED) {
            LocationManager service = (LocationManager) getContext().getSystemService(LOCATION_SERVICE);
            Criteria criteria = new Criteria();
            String provider = service.getBestProvider(criteria, false);
            Location location = service.getLastKnownLocation(provider);
            LatLng userLocation = new LatLng(location.getLatitude(), location.getLongitude());
            LatLng carambarLocation = new LatLng(carambar.getLat(), carambar.getLng());
            Toast.makeText(getContext(),""+distance(userLocation,carambarLocation), Toast.LENGTH_LONG).show();
        }

        // Lookup view for data population
        TextView carambarName = (TextView) convertView.findViewById(R.id.carambarName);
        TextView carambarDesc = (TextView) convertView.findViewById(R.id.carambarDesc);
        ImageView carambarImg = (ImageView) convertView.findViewById(R.id.carambarImg);

        Typeface font = Typeface.createFromAsset(getContext().getAssets(), "Lato-Light.ttf");

        // Populate the data into the template view using the data object
        carambarName.setText(carambar.getName());
        carambarName.setTypeface(font, Typeface.BOLD);
        carambarDesc.setText(carambar.getDesc());
        carambarDesc.setTypeface(font);
        carambarImg.setImageResource(carambar.getImg());

        carambarImg.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                boolean connected = false;
                ConnectivityManager connectivityManager = (ConnectivityManager)getContext().getSystemService(Context.CONNECTIVITY_SERVICE);
                if (connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE).getState() == NetworkInfo.State.CONNECTED ||
                        connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI).getState() == NetworkInfo.State.CONNECTED) {
                    connected = true;
                }
                if (connected) {
                    Intent myIntent = new Intent(getContext(), MapsActivity.class);
                    myIntent.putExtra("carambar", carambar);
                    getContext().startActivity(myIntent);
                }
                else
                {
                    Toast.makeText(getContext(),"Connection internet non disponible", Toast.LENGTH_LONG).show();
                }
            }
        });

        // Return the completed view to render on screen
        return convertView;
    }


    /**
     * Function from https://stackoverflow.com/questions/8832071/how-can-i-get-the-distance-between-two-point-by-latlng
     * @param p1
     * @param p2
     * @return
     */
    private float distance (LatLng p1, LatLng p2)
    {
        double lat_a, lng_a, lat_b, lng_b;
        lat_a = p1.latitude;
        lng_a = p1.longitude;
        lat_b = p2.latitude;
        lng_b = p2.longitude;
        double earthRadius = 3958.75;
        double latDiff = Math.toRadians(lat_b-lat_a);
        double lngDiff = Math.toRadians(lng_b-lng_a);
        double a = Math.sin(latDiff /2) * Math.sin(latDiff /2) +
                Math.cos(Math.toRadians(lat_a)) * Math.cos(Math.toRadians(lat_b)) *
                        Math.sin(lngDiff /2) * Math.sin(lngDiff /2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        double distance = earthRadius * c;

        int meterConversion = 1609;

        return new Float(distance * meterConversion).floatValue();
    }

}