package de.dhbw.comix.database;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Persistenzklasse für einen Comic. Die Details, wie du so eine Klasse selbst
 * programmieren kannst, lernen wir nächstes Semester.
 */
@Entity
@Table(name="COMIX_L_COMIC")
public class Comic implements Serializable {

    private static final long serialVersionUID = 1L;

    // Die ID wird beim Speichern automatisch generiert
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private String serie;    
    private int nummer;
    private int jahr;
    private String titel;
    private String zeichner;
    private String texter;

    // <editor-fold defaultstate="collapsed" desc="${Konstruktoren}">
    /**
     * Standard-Konstruktor, der das Objekt mit leeren Werten initialisiert.
     */
    public Comic() {
    }
    
    /**
     * Konstruktor für einen neuen Comic mit Daten
     * @param serie
     * @param titel
     * @param nummer
     * @param jahr
     * @param zeichner 
     * @param texter 
     */
    public Comic(String serie, String titel, int nummer, int jahr, String zeichner, String texter) {
        this.serie = serie;
        this.titel = titel;
        this.nummer = nummer;
        this.jahr = jahr;
        this.zeichner = zeichner;
        this.texter = texter;
    }
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="${Krimskrams von Object geerbt}">
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Comic)) {
            return false;
        }
        Comic other = (Comic) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "de.dhbw.comix.Comic[ id=" + id + " ]";
    }
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="${Setter und Getter}">
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSerie() {
        return serie;
    }

    public void setSerie(String serie) {
        this.serie = serie;
    }

    public int getNummer() {
        return nummer;
    }

    public void setNummer(int nummer) {
        this.nummer = nummer;
    }

    public int getJahr() {
        return jahr;
    }

    public void setJahr(int jahr) {
        this.jahr = jahr;
    }

        public String getTitel() {
        return titel;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }
    
    public String getZeichner() {
        return zeichner;
    }

    public void setZeichner(String zeichner) {
        this.zeichner = zeichner;
    }

    public String getTexter() {
        return texter;
    }

    public void setTexter(String texter) {
        this.texter = texter;
    }
    // </editor-fold>
    
}
