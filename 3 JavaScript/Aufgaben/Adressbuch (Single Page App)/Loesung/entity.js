"use strict";

/**
 * Konfigurationsobjekt für Adressdatensätze in der Datenbank. Vgl. Dokumentation
 * zur Methode `createCollection` in der Klasse `Database`. Diese Klasse bietet
 * eine Reihe von statischen Methoden:
 * 
 *  - createNew(): Erzeugt ein neues, leeres Adressobjekt
 *  - validate(address): Prüft die Daten eines Adressobjekts
 *  - compare(a, b): Vergleicht zwei Adressen zwecks Sortierung
 * 
 * Die Methode `compare(a,b)` wird von der Datenbankklasse verwendet, um die Einträge
 * beim Speichern zu sortieren. Alle anderen Methoden sind eigene Methode, die innerhalb
 * der Benutzeroberfläche der Anwendung aufgerufen werden können.
 * 
 * Die Datenbank kann prinzipiell beliebig viele Collections mit beliebig vielen
 * Datensätzen verwalten. Falls die Anwendung um weitere Datenarten erweitert werden
 * soll, muss hierfür diese Klasse kopiert und der Aufruf von `createCollection()`
 * in der init-Methode der App-Klasse dupliziert werden.
 */
export class AddressEntity {
    /**
     * Statische Hilfsmethode zum Erzeugen eines neuen Adressdatensatzes. Der Datensatz
     * wird absichtlich als einfaches Objekt ohne Methoden generiert, da er in dieser
     * Form in der Datenbank abgelegt und von dieser wieder ausgelesen wird.
     * 
     * @returns {Object} Neuer Adressdatensatz
     */
    static createNew() {
        return {
            id: -1,
            firstName: "",
            lastName: "",
            phone: "",
            email: "",  
        }
    }

    /**
     * Überprüft das übergebene Adressobjekt. Im Erfolgsfall passiert einfach nichts.
     * Im Fehlerfall wird eine Exception geworfen, die abgefangen und als Fehlermeldung
     * auf dem Bildschirm ausgegeben werden kann.
     * 
     * @param {Object} address Zu speichernder Adressdatensatz
     * @throws {String} Fehlermeldung, falls die Prüfung fehlschlägt
     */
    static validate(address) {
        if (!address.hasOwnProperty("firstName") || !address.firstName) {
            throw "Geben Sie erst einen Vornamen ein.";
        }

        if (!address.hasOwnProperty("lastName") || !address.lastName) {
            throw "Geben Sie erst einen Nachnamen ein.";
        }
    }

    /**
     * Vergleichsfunktion zur Sortierung von Adressbucheinträgen nach Nachname und Vorname.
     * 
     * @param {Object} a Adresse A
     * @param {Object} b Adresse B
     * @returns -1, 0, 1 entsprechend der Reihenfolge von A und B
     */
    static compare(a, b) {
        let a_lastName = a.lastName.toUpperCase();
        let a_firstName = a.firstName.toUpperCase();

        let b_lastName = b.lastName.toUpperCase();
        let b_firstName = b.firstName.toUpperCase();

        if (a_lastName < b_lastName) {
            return -1;
        } else if (a_lastName > b_lastName) {
            return 1;
        } else if (a_firstName < b_firstName) {
            return -1;
        } else if (a_firstName > b_firstName) {
            return 1;
        } else {
            return 0;
        }
    }
}

/**
 * Hilfsfunktion zur Erzeugung von Demoadressen, falls keine Adressen in der
 * Datenbank vorhanden sind.
 * 
 * @param {Database} database Datenbankinstanz
 */
export async function createDemoAddresses(addressCollection) {
    let existingData = await addressCollection.findAll();

    if (existingData.length == 0) {
        addressCollection.save({
            firstName: "Willy",
            lastName: "Tanner",
            phone: "+49 711 564412",
            email: "willy.tanner@alf.com",
        });

        addressCollection.save({
            firstName: "Michael",
            lastName: "Knight",
            phone: "+49 721 554194",
            email: "michael@knight-rider.com",
        });

        addressCollection.save({
            firstName: "Fox",
            lastName: "Mulder",
            phone: "+49 721 553181",
            email: "mulder@xfiles.com",
        });

        addressCollection.save({
            firstName: "Dana",
            lastName: "Scully",
            phone: "+49 721 572287",
            email: "scully@xfiles.com",
        });

        addressCollection.save({
            firstName: "Elwood",
            lastName: "Blues",
            phone: "+49 721 957338",
            email: "elwood@blues-brothers.com",
        });
    }
}