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
                    first_name: "Willy",
                    last_name: "Tanner",
                    phone: "+49 711 564412",
                    email: "willy.tanner@alf.com",
                },
                {
                    first_name: "Michael",
                    last_name: "Knight",
                    phone: "+49 721 554194",
                    email: "michael@knight-rider.com",
                },
                {
                    first_name: "Fox",
                    last_name: "Mulder",
                    phone: "+49 721 553181",
                    email: "mulder@xfiles.com",
                },
                {
                    first_name: "Dana",
                    last_name: "Scully",
                    phone: "+49 721 572287",
                    email: "scully@xfiles.com",
                },
                {
                    first_name: "Elwood",
                    last_name: "Blues",
                    phone: "+49 721 957338",
                    email: "elwood@blues-brothers.com",
                },
            ];
        }
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
     * @param  {Integer} index Index des gewünschten Datensatzes
     * @return {Object} Gewünschter Datensatz oder undefined
     */
    async getById(index) {
        let copy = {};
        Object.assign(copy, this._data[index]);
        return copy;
    }

    /**
     * Aktualisiert den Datensatz mit dem übergebenen Index und überschreibt
     * ihn mit dem ebenfalls übergebenen Objekt. Der Datensatz muss hierfür
     * bereits vorhanden sein.
     *
     * @param {Integer} index Index des zu aktualisierenden Datensatzes
     * @param {Object} dataset Neue Daten des Datensatzes
     */
    async update(index, dataset) {
        this._data[index] = dataset;
        this._updateLocalStorage();
    }

    /**
     * Löscht den Datensatz mit dem übergebenen Index. Alle anderen Datensätze
     * rücken dadurch eins vor.
     *
     * @param {[type]} index Index des zu löschenden Datensatzes
     */
    async delete(index) {
        this._data.splice(index, 1);
        this._updateLocalStorage();
    }

    /**
     * Fügt einen neuen Datensatz am Ende der Liste hinzu.
     *
     * @param  {Object} dataset Neu anzuhängender Datensatz
     * @return {Integer} Index des neuen Datensatzes
     */
    async insert(dataset) {
        let copy = {};
        Object.assign(copy, dataset);
        this._data.push(copy);
        this._updateLocalStorage();

        return this._data.length - 1;
    }

    /**
     * Inhalt der Datenbank im Local Storage des Browsers ablegen, damit er
     * beim Neuladen der Seite erhalten bleibt.
     */
    _updateLocalStorage() {
        localStorage.setItem("database", JSON.stringify(this._data));
    }
};
