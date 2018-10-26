package fr.unice.polytech.tradambars.model;

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
}
