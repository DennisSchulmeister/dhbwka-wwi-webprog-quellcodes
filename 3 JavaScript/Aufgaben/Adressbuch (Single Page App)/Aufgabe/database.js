"use strict";

export default class Database {
    /**
     * Konstruktor
     */
    constructor() {
        this._data = [];
    }

    /**
     * Tatsächliche Initialisierung der Datenbank. Dies findet hier in einer
     * asynchronen Methode statt, um die Anwendung später leichter auf eine
     * echte entfernte Datenbank umstellen zu können, deren Zugriffe, da immer
     * ein HTTP-Datenaustausch damit verbunden ist, nur asynchron im Hintergrund
     * ausgeführt werden können.
     */
    async init() {
        // Datensätze unserer Anwendung. Falls Sie die Anwendung erweitern
        // wollen, so dass die Datensätze nicht verloren gehen können, müssten
        // Sie hier die Datensätze komplett einlesen und wiederherstellen.
        this._data = JSON.parse(localStorage.getItem("database"));

        if (!this._data || !this._data.length) {
            this._data = [
                {
                    id: 1,
                    first_name: "Willy",
                    last_name: "Tanner",
                    phone: "+49 711 564412",
                    email: "willy.tanner@alf.com",
                },
                {
                    id: 2,
                    first_name: "Michael",
                    last_name: "Knight",
                    phone: "+49 721 554194",
                    email: "michael@knight-rider.com",
                },
                {
                    id: 3,
                    first_name: "Fox",
                    last_name: "Mulder",
                    phone: "+49 721 553181",
                    email: "mulder@xfiles.com",
                },
                {
                    id: 4,
                    first_name: "Dana",
                    last_name: "Scully",
                    phone: "+49 721 572287",
                    email: "scully@xfiles.com",
                },
                {
                    id: 5,
                    first_name: "Elwood",
                    last_name: "Blues",
                    phone: "+49 721 957338",
                    email: "elwood@blues-brothers.com",
                },
            ];
        }

        this._data.sort(this._compareLastnameFirstname);
    }

    /**
     * Gibt die komplette Liste mit allen Daten zurück.
     * @return {Array} Array mit allen Datenobjekten
     */
    async getAll() {
        return this._data;
    }

    /**
     * Gibt den Datensatz mit dem übergebenen Index zurück. Kann der Datensatz
     * nicht gefunden werden, wird undefined zurückgegeben.
     *
     * @param  {Integer} id ID des gewünschten Datensatzes
     * @return {Object} Gewünschter Datensatz oder undefined
     */
    async getById(id) {
        let dataset = this._data.find(e => e.id == id);
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

            this._data.forEach(existing => {
                dataset.id = Math.max(dataset.id, existing.id);
            });

            dataset.id++;
        }

        this._data.push(dataset);

        this._data.sort(this._compareLastnameFirstname);
        this._updateLocalStorage();
    }

    /**
     * Löscht den Datensatz mit dem übergebenen Index. Alle anderen Datensätze
     * rücken dadurch eins vor.
     *
     * @param {[type]} id ID des zu löschenden Datensatzes
     */
    async delete(id) {
        this._data = this._data.filter(e => e.id != id);
        this._updateLocalStorage();
    }

    /**
     * Inhalt der Datenbank im Local Storage des Browsers ablegen, damit er
     * beim Neuladen der Seite erhalten bleibt.
     */
    _updateLocalStorage() {
        localStorage.setItem("database", JSON.stringify(this._data));
    }

    /**
     * Hilfsmethode zum Sortieren der Datenliste. Die Liste wird nach
     * Nachname und dann nach Vorname sortiert.
     *
     * @param  {Object} a Vergleichsdatensatz A
     * @param  {Object} b Vergleichsdatensatz B
     * @return {Number} -1, 0 oder 1
     */
    _compareLastnameFirstname(a, b) {
        let a_last_name = a.last_name.toUpperCase();
        let a_first_name = a.first_name.toUpperCase();

        let b_last_name = b.last_name.toUpperCase();
        let b_first_name = b.first_name.toUpperCase();

        if (a_last_name < b_last_name) {
            return -1;
        } else if (a_last_name > b_last_name) {
            return 1;
        } else if (a_first_name < b_first_name) {
            return -1;
        } else if (a_first_name > b_first_name) {
            return 1;
        } else {
            return 0;
        }
    }
};
