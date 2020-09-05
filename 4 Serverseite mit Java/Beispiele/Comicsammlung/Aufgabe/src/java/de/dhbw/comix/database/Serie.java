package de.dhbw.comix.database;

import java.util.ArrayList;
import java.util.List;

/**
 * Hilfsklasse, die alle Comics einer Serie zusammenfasst.
 */
public class Serie {
    
    private String serie = "";
    private List<Comic> comics = new ArrayList<>();
    
    public Serie() {
    }

    public String getSerie() {
        return serie;
    }

    public void setSerie(String serie) {
        this.serie = serie;
    }

    public List<Comic> getComics() {
        return comics;
    }

    public void setComics(List<Comic> comics) {
        this.comics = comics;
    }

}
