"use strict";

/**
 * Hilfsklasse zur Implementierung einer einfachen NoSQL-Datenbank im Local Storage des Browsers.
 * Diese ermöglicht es, eine beliebige Anzahl von Collections zu verwalten, von denen jede eine
 * beliebige Anzahl von Datensätzen speichern kann. Im Grunde genommen ähnlich wie bei einer
 * relationalen Datenbank, deren Tabellen beliebig viele Datensätze beinhalten können. Anders
 * als bei einer relationalen Datenbank müssen die Einträge einer Collection aber keinen festen,
 * immer gleichen Aufbau besitzen und können auch komplexe Datenstrukturen (geschachtelte Objekte
 * und Listen) umfassen.
 * 
 * Beim Start der Anwendung sollte eine neue Instanz dieser Klasse erzeugt und mit den anderen
 * Programmteilen als Singleton-Objekt geteilt werden. Ebenso sollten die vorgesehenen Collections
 * angelegt und konfiguriert werden, wobei letzter Schritt nicht zwingend erforderlich ist. Sobald
 * eine Collection mindestens einen Datensatz beinhaltet, ist sie beim nächsten Programmstart
 * automatisch vorhanden. Darauf sollte man sich aber nicht verlassen, da die Datenbank ja durchaus
 * manuell (z.B. durch Löschen des Browser-Caches) geleert worden sein kann.
 * 
 * HINWEIS: Die Methoden dieser Klasse sind als asynchron gekennzeichnet, obwohl das für die Implementierung
 * gar nicht notwendig wäre. Die meisten Datenbank arbeiten jedoch mit asynchronen Zugriffen, um die Performance
 * der Aufrufers nicht zu beinträchtigen. Dies ist an dieser Stelle schon vorgedacht, damit die Anwendung später
 * leichter auf eine "echte" Datenbank (z.B. auf einem entfernten Server) umgestellt werden kann.
 * 
 * HINWEIS: In einer echten Anwendung würde man vermutlich eher eine leistungsfähigere Datenbank-Bibliothek
 * verwenden. Der Inhalt dieser Quelldatei wäre dann hinfällig.
 */
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
     * Tatsächliche Initialisierung der Datenbank. Hier werden die im Local Storage des Browsers
     * abgelegten Daten in den Speicher geladen.
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
     * 
     * Optional kann ein Konfigurationsobjekt mitgegeben werden, um das Verhalten der Collection
     * zu beeinflussen, was aktuell nur die Sortierung der Einträge betrifft. Das Objekt muss hierzu
     * folgenden Aufbau haben:
     * 
     *   {
     *      compare: function(a, b) { ... }
     *   }
     * 
     * Die Funktion `compare` vergleicht dabei zwei Einträge der Collection und gibt entweder -1, 0
     * oder 1 zurück, je nachdem ob Entität A vor, auf derselben Höhe oder nach Entität B erscheinen soll.
     * 
     * Es wird empfohlen, die Methode `createCollection()` im Programmstart immer aufzurufen, um eine
     * einheitliche Konfiguration er gewährleisten. Zwar gehen die Collections sonst nicht verloren,
     * es werden aber nur ihre Inhalte und nicht ihre Konfiguration in der Datenbank gespeichert.
     * 
     * @param {String} name Name der Collection
     * @param {Class} config Konfiguration der Collection
     */
    async createCollection(name, config) {
        if (this._collections.indexOf(name) < 0) {
            this._collections.push(name);
        }

        if (!this._data.hasOwnProperty(name)) {
            this._data[name] = [];
        }
        
        this[name] = new Collection(this, name, config);
    }

    /**
     * Komplette Collection löschen.
     * @param {String} name Name der Collection
     */
    async deleteCollection(name) {
        if (this._collections.indexOf(name) >= 0) {
            this._collections = this._collections.filter(c => c.name !== name);
            delete this._data[name];
            delete this[name];
            this._updateLocalStorage();
        }
    }
};

/**
 * Interne Hilfsklasse für die Klasse `Datenbank`. Diese implementiert die öffentliche
 * Schnittstelle einer Collection in der Datenbank mit folgenden Methoden:
 * 
 *   - async findAll()
 *   - async findById(id)
 *   - async save(dataset)
 *   - async delete(id)
 */
class Collection {
    /**
     * Konstruktor.
     * 
     * @param {Database} database Datenbankinstanz
     * @param {String} name Name der Entität
     * @param {Class} class Klasse der Entität
     */
    constructor(database, name, config) {
        this._database = database;
        this._name = name;
        this._config = config || {};
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

        if (this._config.hasOwnProperty("compare")) {
            this._database._data[this._name].sort(this._config.compare);
        }

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