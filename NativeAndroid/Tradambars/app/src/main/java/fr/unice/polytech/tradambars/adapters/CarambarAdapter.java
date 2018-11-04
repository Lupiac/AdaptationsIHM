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
import android.support.annotation.NonNull;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.maps.model.LatLng;

import org.w3c.dom.Text;

import java.util.ArrayList;

import fr.unice.polytech.tradambars.R;
import fr.unice.polytech.tradambars.activities.MapsActivity;
import fr.unice.polytech.tradambars.model.Carambar;

import static android.content.Context.LOCATION_SERVICE;


public class CarambarAdapter extends RecyclerView.Adapter<CarambarAdapter.ViewHolder> {

    /*public CarambarAdapter(Context context, ArrayList<Carambar> users) {
        super(context, 0, users);
    }*/

    private ArrayList<Carambar> carambarList = new ArrayList<>();
    private ArrayList<Carambar> filteredCarambarList = new ArrayList<>();
    private Context context;

    public CarambarAdapter(Context context, ArrayList<Carambar> carambarList) {
        this.carambarList = carambarList;
        this.filteredCarambarList = new ArrayList<Carambar>();
        this.filteredCarambarList.addAll(carambarList);
        this.context = context;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.row, parent, false);
        ViewHolder holder = new ViewHolder(view);
        return holder;
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        final Carambar carambar = filteredCarambarList.get(position);

        Typeface font = Typeface.createFromAsset(context.getAssets(), "Lato-Light.ttf");

        // Populate the data into the template view using the data object
        holder.carambarName.setText(carambar.getName());
        holder.carambarName.setTypeface(font, Typeface.BOLD);
        holder.carambarDesc.setText(carambar.getDesc());
        holder.carambarDesc.setTypeface(font);
        holder.carambarImg.setImageResource(carambar.getImg());

        holder.carambarImg.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                boolean connected = false;
                ConnectivityManager connectivityManager = (ConnectivityManager)context.getSystemService(Context.CONNECTIVITY_SERVICE);
                if (connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE).getState() == NetworkInfo.State.CONNECTED ||
                        connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI).getState() == NetworkInfo.State.CONNECTED) {
                    connected = true;
                }
                if (connected) {
                    Intent myIntent = new Intent(context, MapsActivity.class);
                    myIntent.putExtra("carambar", carambar);
                    context.startActivity(myIntent);
                }
                else
                {
                    Toast.makeText(context,"Connection internet non disponible", Toast.LENGTH_LONG).show();
                }
            }
        });
    }

    @Override
    public int getItemCount() {
        return filteredCarambarList.size();
    }

    public void updateView(int radius) {
        this.filteredCarambarList.clear();
        if (ContextCompat.checkSelfPermission(context,
                Manifest.permission.ACCESS_FINE_LOCATION)
                == PackageManager.PERMISSION_GRANTED) {
            for (Carambar c : carambarList) {
                LocationManager service = (LocationManager) context.getSystemService(LOCATION_SERVICE);
                Criteria criteria = new Criteria();
                String provider = service.getBestProvider(criteria, false);
                Location location = service.getLastKnownLocation(provider);
                LatLng userLocation = new LatLng(location.getLatitude(), location.getLongitude());
                LatLng carambarLocation = new LatLng(c.getLat(), c.getLng());

                int distance = (int)distance(userLocation, carambarLocation);
                if (distance <= radius*1000) {
                    this.filteredCarambarList.add(c);
                }
            }
        }
        notifyDataSetChanged();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        TextView carambarName;
        TextView carambarDesc;
        ImageView carambarImg;

        public ViewHolder(View itemView) {
            super(itemView);
            carambarName = (TextView) itemView.findViewById(R.id.carambarName);
            carambarDesc = (TextView) itemView.findViewById(R.id.carambarDesc);
            carambarImg = (ImageView) itemView.findViewById(R.id.carambarImg);
        }
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