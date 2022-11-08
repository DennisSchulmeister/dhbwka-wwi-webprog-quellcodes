"use strict";

/**
 * Basisklasse für Entities zur Definition des Datenmodells der Anwendung.
 * Jede Entity wird in einer Collection gespeichert, wobei ein Entityobjekt
 * einem Datensatz entspricht.
 */
class Entity {
    /**
     * Methode muss von den Unterklassen ausprogrammiert werden, damit die
     * Entities für die Anzeige sortiert werden können.
     * 
     * @param {*} entity1 Zu vergleichende Entity 1
     * @param {*} entity2 ZU vergleichende Entity 2
     * @return {Number} -1, 0 oder 1
     */
    compare(entity1, entity2) {
        return 0;
    }
}

/**
 * Adresse: id, firstName, lastName, phone, email
 */
class AddressEntity extends Entity {
    constructor(data) {
        super();
        data = data || {};

        this.id = data.id || "";
        this.firstName = data.firstName || "";
        this.lastName = data.lastName || "";
        this.phone = data.phone || "";
        this.email = data.email || "";
    }

    /**
     * Hilfsmethode zum Sortieren der Datenliste. Die Liste wird nach
     * Nachname und dann nach Vorname sortiert.
     *
     * @param  {Object} a Vergleichsdatensatz A
     * @param  {Object} b Vergleichsdatensatz B
     * @return {Number} -1, 0 oder 1
     */
    compare(a, b) {
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
}

export {
    Entity,
    AddressEntity
}