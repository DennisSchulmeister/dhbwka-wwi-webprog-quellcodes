package de.dhbw.todo;

/**
 * Einfache Datentransferklasse für einen Eintrag der TODO-Liste.
 */
public class TodoEintrag {

    String titel;
    String beschreibung;

    public String getTitel() {
        return this.titel;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }

    public String getBeschreibung() {
        return this.beschreibung;
    }

    public void setBeschreibung(String beschreibung) {
        this.beschreibung = beschreibung;
    }

}
