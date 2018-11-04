package fr.unice.polytech.tradambars.model;

import com.google.android.gms.maps.model.LatLng;

import java.io.Serializable;

public class Carambar implements Serializable {

    protected String name, desc;
    protected int img;
    protected double lat, lng;

    public Carambar(String nom, String desc, int img, double lat, double lng) {
        this.name = nom;
        this.desc = desc;
        this.img = img;
        this.lat = lat;
        this.lng = lng;
    }

    public String getName() {
        return this.name;
    }

    public String getDesc() {
        return this.desc;
    }

    public double getLat() {
        return lat;
    }

    public double getLng() {
        return lng;
    }

    public int getImg() {
        return this.img;
    }

    @Override
    public String toString() {
        return "Carambar{" +
                "name='" + name + '\'' +
                ", desc='" + desc + '\'' +
                ", img=" + img +
                ", lat=" + lat +
                ", lng=" + lng +
                '}';
    }

    /**
     * Function from https://stackoverflow.com/questions/8832071/how-can-i-get-the-distance-between-two-point-by-latlng
     * @param p2
     * @return
     */
    public float distance (LatLng p2)
    {
        LatLng p1 = new LatLng(this.lat, this.lng);
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
