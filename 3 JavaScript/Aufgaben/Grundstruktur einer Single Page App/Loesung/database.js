"use strict";

/**
 * Klasse Database: Kümmert sich um die Datenhaltung der App
 *
 * Diese Klasse beinhaltet alle Datensätze der App. Entgegen dem Namen handelt
 * es sich nicht wirklich um eine Datenbank, da sie lediglich ein paar statische
 * Testdaten enthält. Ausgefeilte Methoden zum Durchsuchen, Ändern oder Löschen
 * der Daten fehlen komplett, könnten aber in einer echten Anwendung relativ
 * einfach hinzugefügt werden.
 */
class Database {
    /**
     * Konstruktor.
     */
    constructor() {
        this._data = [
            {
                id:          1,
                img:        "boats/1.jpg",
                name:       "Petrine",
                typ:        "Ewer",
                stapellauf: 1909,
                verbleib:   "In Fahrt",
                link:       "https://de.wikipedia.org/wiki/Petrine",
            },{
                id:          2,
                img:        "boats/2.jpg",
                name:       "Falado",
                typ:        "Brigatine",
                stapellauf: 1968,
                verbleib:   "Westlich von Island gesunken",
                link:       "https://de.wikipedia.org/wiki/Falado_von_Rhodos",
            },{
                id:          3,
                img:        "boats/3.jpg",
                name:       "Gorch Fock",
                typ:        "Segelschiff",
                stapellauf: 1958,
                verbleib:   "In Fahrt",
                link:       "https://de.wikipedia.org/wiki/Gorch_Fock_(Schiff,_1958)",
            },{
                id:          4,
                img:        "boats/4.jpg",
                name:       "Mare Frisium",
                typ:        "Dreimastmarstoppsegelschoner",
                stapellauf: 1916,
                verbleib:   "In Fahrt",
                link:       "https://de.wikipedia.org/wiki/Mare_Frisium",
            },{
                id:          5,
                img:        "boats/5.jpg",
                name:       "Preußen",
                typ:        "Frachtsegler",
                stapellauf: 1902,
                verbleib:   "Kollision im Ärmelkanal",
                link:       "https://de.wikipedia.org/wiki/Preu%C3%9Fen_(Schiff,_1902)",
            },{
                id:          6,
                img:        "boats/6.jpg",
                name:       "HMS Victory",
                typ:        "Linienschiff",
                stapellauf: 1765,
                verbleib:   "Museum im Portsmouth",
                link:       "https://de.wikipedia.org/wiki/HMS_Victory",
            },{
                id:          7,
                img:        "boats/7.jpg",
                name:       "Schulschiff Deutschland",
                typ:        "Segelschulschiff",
                stapellauf: 1927,
                verbleib:   "Kulturdenkmal in Bremen-Vegesack",
                link:       "https://de.wikipedia.org/wiki/Schulschiff_Deutschland",
            },
        ];
    }

    /**
     * Diese Methode sucht einen Datensazt anhand seiner ID in der Datenbank
     * und liefert den ersten, gefundenen Treffer zurück.
     *
     * @param  {Number} id Datensatz-ID
     * @return {Object} Gefundener Datensatz
     */
    getRecordById(id) {
        id = parseInt(id);
        return this._data.find(r => r.id === id);
    }

    /**
     * Diese Methode gibt eine Liste mit allen Datensätzen zurück.
     * @return {Array} Liste aller Datensätze
     */
    getAllRecords() {
        return this._data;
    }
}
