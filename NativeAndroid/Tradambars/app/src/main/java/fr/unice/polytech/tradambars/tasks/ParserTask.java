package fr.unice.polytech.tradambars.tasks;

/**
 * Created by hoangpq on 12/25/2016.
 */


// FROM TURORIAL https://www.youtube.com/watch?v=pH1pKJPgEJc

import android.graphics.Color;
import android.os.AsyncTask;
import android.util.Log;

import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Polyline;
import com.google.android.gms.maps.model.PolylineOptions;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

class PolylineHolder {
    private static Polyline polyline = null;

    static void setLine(Polyline polyline) {
        PolylineHolder.polyline = polyline;
    }

    static void removeLine() {
        if (PolylineHolder.polyline != null) {
            PolylineHolder.polyline.remove();
        }
    }
}

public class ParserTask extends AsyncTask<String, Integer, List<List<HashMap<String, String>>>> {

    private GoogleMap mMap;
    private Polyline polyline;

    public ParserTask(GoogleMap mMap) {
        this.mMap = mMap;
    }

    // Parsing the data in non-ui thread
    @Override
    protected List<List<HashMap<String, String>>> doInBackground(String... jsonData) {
        JSONObject jObject;
        List<List<HashMap<String, String>>> routes = null;
        try {
            jObject = new JSONObject(jsonData[0]);
            DirectionsJSONParser parser = new DirectionsJSONParser();
            // Starts parsing data
            routes = parser.parse(jObject);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return routes;
    }

    // Executes in UI thread, after the parsing process
    @Override
    protected void onPostExecute(List<List<HashMap<String, String>>> result) {
        PolylineHolder.removeLine();
        ArrayList<LatLng> points = new ArrayList<>();
        PolylineOptions lineOptions = new PolylineOptions();
        // Traversing through all the routes
        for (int i = 0; i < result.size(); i++) {
            points = new ArrayList<>();
            lineOptions = new PolylineOptions();
            // Fetching i-th route
            List<HashMap<String, String>> path = result.get(i);
            // Fetching all the points in i-th route
            for (int j = 0; j < path.size(); j++) {
                HashMap<String, String> point = path.get(j);
                double lat = Double.parseDouble(point.get("lat"));
                double lng = Double.parseDouble(point.get("lng"));
                LatLng position = new LatLng(lat, lng);
                points.add(position);
            }
            // Adding all the points in the route to LineOptions
            lineOptions.addAll(points);
            lineOptions.width(5);
            lineOptions.color(Color.rgb(0, 140, 186));
        }
        // Drawing polyline in the Google Map for the i-th route
        PolylineHolder.setLine(mMap.addPolyline(lineOptions));
    }
}