package de.dhbw.comix.database;

import java.util.ArrayList;
import java.util.List;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * Enterprise Java Bean (was das ist lernst du im vierten Semester), die uns
 * einfache Methoden zum Finden und Speichern von Datenbankinhalten bietet.
 */
@Stateless
@LocalBean
public class DatabaseFacade {

    @PersistenceContext(unitName = "default")
    private EntityManager em;

    /**
     * Anlegen eines neuen Comics. Das neue Objekt wird automatisch in der
     * Datenbank gespeichert. Nachträgliche Änderungen daran müssen daher mit
     * der save()-Methode manuell gespeichert werden.
     *
     * @param serie
     * @param titel
     * @param nummer
     * @param jahr
     * @param zeichner
     * @param texter
     * @return
     */
    public Comic createNewComic(String serie, String titel, int nummer, int jahr, String zeichner, String texter) {
        Comic comic = new Comic(serie, titel, nummer, jahr, zeichner, texter);
        return this.em.merge(comic);
    }

    /**
     * Auslesen eines einzelnen Comics aus der Datenbank anhand seiner ID.
     *
     * @param id
     * @return
     */
    public Comic getComicById(Long id) {
        return this.em.find(Comic.class, id);
    }

    /**
     * Liefert eine Liste mit allen Comics gruppiert nach Serie. Die Liste soll
     * so, wie sie kommt, auf der Webseite angezeigt werden.
     *
     * @return
     */
    public List<Serie> getAllComics() {
        List<Serie> serien = new ArrayList<>();
        List<Comic> comics = this.em.createQuery("SELECT c FROM Comic c ORDER BY c.serie, c.jahr, c.nummer").getResultList();
        Serie serie = null;

        for (Comic comic : comics) {
            if (serie == null || !comic.getSerie().equals(serie.getSerie())) {
                serie = new Serie();
                serie.setSerie(comic.getSerie());
                serien.add(serie);
            }
            
            serie.getComics().add(comic);
        }

        return serien;
    }

    /**
     * Nachträgliches Speichern eines Comics.
     *
     * @param comic
     * @return
     */
    public Comic save(Comic comic) {
        return this.em.merge(comic);
    }

    /**
     * Löschen eines Comics.
     *
     * @param comic
     */
    public void delete(Comic comic) {
        comic = this.em.merge(comic);
        this.em.remove(comic);
    }

}
