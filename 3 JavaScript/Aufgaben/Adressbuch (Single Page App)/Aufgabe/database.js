"use strict";

export default class Database {
    /**
     * Konstruktor
     */
    constructor() {
        this._dbname = "local_database";
        this._collections = [];
        this._data = {};
    }

    /**
     * Tatsächliche Initialisierung der Datenbank. Dies findet hier in einer
     * asynchronen Methode statt, um die Anwendung später leichter auf eine
     * echte entfernte Datenbank umstellen zu können, deren Zugriffe, da immer
     * ein HTTP-Datenaustausch damit verbunden ist, nur asynchron im Hintergrund
     * ausgeführt werden können.
     */
    async init() {
        let storage = JSON.parse(localStorage.getItem(this._dbname)) || {};

        if ("collections" in storage) {
            for (let collection of storage.collections) {
                this.createCollection(collection);
            }
        }

        if ("data" in storage) {
            this._data = storage.data;
        }
    }

    /**
     * Inhalt der Datenbank im Local Storage des Browsers ablegen, damit er
     * beim Neuladen der Seite erhalten bleibt.
     */
    _updateLocalStorage() {
        localStorage.setItem(this._dbname, JSON.stringify({
            collections: this._collections,
            data: this._data,
        }));
    }

    /**
     * Neue Collection zum Speichern von Datensätzen anlegen.
     * Erzeugt eine gleichnamige Property zum Zugriff auf die Collection.
     * @param {String} name Name der Collection
     */
    createCollection(name) {
        if (this._collections.indexOf(name) < 0) {
            this._collections.push(name);
            this._data[name] = [];
            this[name] = new Collection(this, name);
        }
    }

    /**
     * Komplette Collection löschen.
     * @param {String} name Name der Collection
     */
    deleteCollection(name) {
        if (this._collections.indexOf(name) >= 0) {
            this._collections = this._collections.filter(e => e !== name);
            delete this._data[name];
            delete this[name];
            this._updateLocalStorage();
        }
    }
};

/**
 * Sammlung von Datensätzen ähnlich einer Datenbanktabelle.
 */
class Collection {
    /**
     * Konstruktor.
     * @param {Database} database Datenbankklasse
     */
    constructor(database, name) {
        this._database = database;
        this._name = name;
    }

    /**
     * Gibt die komplette Liste mit allen Daten zurück.
     * @return {Array} Array mit allen Datenobjekten
     */
    async findAll() {
        return this._database._data[this._name];
    }

    /**
     * Gibt den Datensatz mit dem übergebenen Index zurück. Kann der Datensatz
     * nicht gefunden werden, wird undefined zurückgegeben.
     *
     * @param  {Integer} id ID des gewünschten Datensatzes
     * @return {Object} Gewünschter Datensatz oder undefined
     */
    async findById(id) {
        let dataset = this._database._data[this._name].find(e => e.id == id);
        return Object.assign({}, dataset);
    }

    /**
     * Legt einen neuen Datensatz an oder aktualisiert einen bereits vorhandenen
     * Datensatz mit derselben ID.
     *
     * @param {Object} dataset Neue Daten des Datensatzes
     */
    async save(dataset) {
        if (dataset.id) {
            this.delete(dataset.id);
        } else {
            dataset.id = 0;

            this._database._data[this._name].forEach(existing => {
                dataset.id = Math.max(dataset.id, existing.id);
            });

            dataset.id++;
        }

        this._database._data[this._name].push(dataset);

        //this._database._data[this._name].sort(this._compareLastnameFirstname);
        this._database._updateLocalStorage();
    }

    /**
     * Löscht den Datensatz mit dem übergebenen Index. Alle anderen Datensätze
     * rücken dadurch eins vor.
     *
     * @param {[type]} id ID des zu löschenden Datensatzes
     */
    async delete(id) {
        this._database._data[this._name] = this._database._data[this._name].filter(e => e.id != id);
        this._database._updateLocalStorage();
    }
}