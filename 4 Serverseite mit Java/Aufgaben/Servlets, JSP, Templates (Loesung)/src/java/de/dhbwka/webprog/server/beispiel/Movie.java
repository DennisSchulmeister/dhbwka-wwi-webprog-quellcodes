package de.dhbwka.webprog.server.beispiel;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Persistent Entity für einen Film. Objekte dieser Klasse können in der
 * Datenbank abgelegt und von dort wieder ausgelesen werden. Wie genau das
 * geht, lernen wir nächstes Semester in „Verteilte Systeme”.
 */
@Entity
public class Movie implements Serializable {
    
    @GeneratedValue
    @Id
    private long id;
    
    private String name = "";
    private int releaseYear = -1;
    
    public Movie() {
    }
    
    public Movie(String name, int releaseYear) {
        this.name = name;
        this.releaseYear = releaseYear;
    }

    //<editor-fold defaultstate="collapsed" desc="Setter und Getter">
    public long getId() {
        return id;
    }
    
    public void setId(long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public int getReleaseYear() {
        return releaseYear;
    }
    
    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }
    //</editor-fold>
    
}
