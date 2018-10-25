package fr.unice.polytech.tradambars.adapters;

import android.content.Context;
import android.content.Intent;
import android.graphics.Typeface;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;

import fr.unice.polytech.tradambars.R;
import fr.unice.polytech.tradambars.activities.MapsActivity;
import fr.unice.polytech.tradambars.model.Carambar;


public class CarambarAdapter extends ArrayAdapter<Carambar> {
    public CarambarAdapter(Context context, ArrayList<Carambar> users) {
        super(context, 0, users);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // Get the data item for this position
        Carambar carambar = getItem(position);
        // Check if an existing view is being reused, otherwise inflate the view
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.row, parent, false);
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
                Intent myIntent = new Intent(getContext(), MapsActivity.class);
                myIntent.putExtra("key", "test"); //Optional parameters
                getContext().startActivity(myIntent);
            }
        });

        // Return the completed view to render on screen
        return convertView;
    }
}