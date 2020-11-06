"use strict";

/**
 * Klasse Database: Verwaltet die Daten der Anwendung
 *
 * Diese Klasse simuliert eine einfache Datenbank, in der die Daten unserer
 * Anwendung liegen. Die Daten werden allerdings nur in einer Variablen im
 * Hauptspeicher des Servers gehalten, statt eine echten Datenbank zu nutzen.
 *
 */
module.exports = class Database {
    /**
     * Konstruktor.
     */
    constructor() {
        // Datensätze unserer Anwendung. Falls du die Anwendung erweitern
        // willst, so dass die Datensätze nicht verloren gehen können, müsstest
        // du die Datensätze hier komplett einlesen und wiederherstellen.
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

    /**
     * Gibt die komplette Liste mit allen Daten zurück.
     * @return {Array} Array mit allen Datenobjekten
     */
    getData() {
        return this._data;
    }

    /**
     * Gibt den Datensatz mit dem übergebenen Index zurück. Kann der Datensatz
     * nicht gefunden werden, wird undefined zurückgegeben.
     *
     * @param  {Integer} index Index des gewünschten Datensatzes
     * @return {Object} Gewünschter Datensatz oder undefined
     */
    getDataByIndex(index) {
        return this._data[index];
    }

    /**
     * Aktualisiert den Datensatz mit dem übergebenen Index und überschreibt
     * ihn mit dem ebenfalls übergebenen Objekt. Der Datensatz muss hierfür
     * bereits vorhanden sein.
     *
     * @param {Integer} index Index des zu aktualisierenden Datensatzes
     * @param {Object} dataset Neue Daten des Datensatzes
     */
    updateDataByIndex(index, dataset) {
        this._data[index] = dataset;
    }

    /**
     * Löscht den Datensatz mit dem übergebenen Index. Alle anderen Datensätze
     * rücken dadurch eins vor.
     *
     * @param {[type]} index Index des zu löschenden Datensatzes
     */
    deleteDataByIndex(index) {
        this._data.splice(index, 1);
    }

    /**
     * Fügt einen neuen Datensatz am Ende der Liste hinzu.
     *
     * @param  {Object} dataset Neu anzuhängender Datensatz
     * @return {Integer} Index des neuen Datensatzes
     */
    appendData(dataset) {
        this._data.push(dataset);
        return this._data.length - 1;
    }
}
