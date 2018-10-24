package fr.unice.polytech.tradambars.model;

public class Carambar {

    protected String name, desc;
    protected int img;

    public Carambar(String nom, String desc, int img) {
        this.name = nom;
        this.desc = desc;
        this.img = img;
    }

    public String getName() {
        return this.name;
    }

    public String getDesc() {
        return this.desc;
    }

    public int getImg() {
        return this.img;
    }

    public String toString() {
        return "["+name+": "+desc+"]";
    }

}
