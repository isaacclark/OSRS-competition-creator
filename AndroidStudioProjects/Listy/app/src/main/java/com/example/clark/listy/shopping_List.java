package com.example.clark.listy;


import android.content.Context;
import android.content.SharedPreferences;
import android.hardware.Sensor;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import android.widget.TextView;
import android.widget.ListView;
import android.app.Service;


import com.example.clark.listy.ExampleAdd;
import com.example.clark.listy.ExampleRem;
import com.example.clark.listy.R;

import java.util.ArrayList;
import java.util.Arrays;

public class shopping_List extends AppCompatActivity implements ExampleAdd.ExampleAddListener, ExampleRem.ExampleRemListener {
    private TextView itemList;
    private Button addBtn;
    private Button remBtn;
    private Button clrBtn;
    private ArrayList<String> arrayList;
    private ArrayAdapter<String> adapter;
    private EditText editAdd;
    private EditText editRem;

    private SensorManager sensorManager;
    Sensor accelerometer;

    public static final String LIST_KEY = ("LIST_KEY");
    private SharedPreferences sharedPreferences;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ListView listView=(ListView)findViewById(R.id.listv);
        String[] items ={};
        String temp;
        arrayList = new ArrayList<>(Arrays.asList(items));
        adapter=new ArrayAdapter<String>(this, R.layout.listitem,R.id.textItem,arrayList);
        listView.setAdapter(adapter);

        if (sharedPreferences.contains("LIST_KEY")) {
            String str = (sharedPreferences.getString(LIST_KEY, ""));
            ArrayList<String> list = new ArrayList<String>(Arrays.asList(str.split(" , ")));
            arrayList = list;
        }

        addBtn = (Button) findViewById(R.id.addBtn);
        addBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openAdd();
            }
        });

        remBtn = (Button) findViewById(R.id.remBtn);
        remBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openRem();
            }
        });

        clrBtn = (Button) findViewById(R.id.clrBtn);
        clrBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                applyClr();
            }
        });

    }

    public void save() {
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(LIST_KEY, android.text.TextUtils.join(",", arrayList));
        editor.commit();
        Toast.makeText(getApplicationContext(), "data saved", Toast.LENGTH_SHORT).show();
    }

    public void openAdd(){
        ExampleAdd exampleAdd = new ExampleAdd();
        exampleAdd.show(getSupportFragmentManager(), "example dialog");
    }

    public void openRem(){
        ExampleRem exampleRem = new ExampleRem();
        exampleRem.show(getSupportFragmentManager(), "example dialog");
    }

    @Override
    public void applyAdd(String item) {

        arrayList.add(item);
    }

    @Override
    public void applyRem(String item) {
        while(arrayList.remove(item)) {};
    }

    public void applyClr() {
        arrayList.clear();
    }
}
