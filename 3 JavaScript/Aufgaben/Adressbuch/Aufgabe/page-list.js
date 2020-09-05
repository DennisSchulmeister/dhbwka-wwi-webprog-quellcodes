"use strict";

/**
 * Klasse PageList: Stellt die Listenübersicht zur Verfügung
 *
 * Diese Klasse wird von der App-Klasse zu bestimmten Zeitpunkten instantiiert
 * und aufgerufen, um die Liste mit den Adressen darzustellen.
 */
class PageList {
    /**
     * Konstruktor.
     *
     * @param {App} app Instanz der App-Klasse
     */
    constructor(app) {
        this._app = app;
        this._mainElement = document.getElementById("main-page-list");
    }

    /**
     * Seite anzeigen. Wird von der App-Klasse aufgerufen.
     */
    show() {
        this._renderList();
        // TODO: Dem Hauptelement #main-page-list die CSS-Klasse "hidden" wegnehmen
    }

    /**
     * Seite nicht mehr anzeigen. Wird von der App-Klasse aufgerufen.
     */
    hide() {
        // TODO: Dem Hauptelement #main-page-list die CSS-Klasse "hidden" hinzufügen
    }

    /**
     * Listeninhalte in die HTML-Seite einfügen. (Interne Methode)
     */
    _renderList() {
        // Alte Einträge verwerfen
        let ol = document.querySelector("#main-page-list > ol");
        ol.innerHTML = "";

        // Meldung, wenn noch keine Daten vorhanden sind
        let data = this._app.getData();

        if (data.length < 1) {
            // TODO: Inhalt aus dem Template #template-page-list-empty anzeigen
            // und Methode beenden, wenn in der Liste keine Daten vorhanden sind
        }

        // Datensätze einfügen
        let template = document.getElementById("template-page-list-li").innerHTML;
        let index = -1;

        data.forEach(dataset => {
            // Index hochzählen
            index++;

            // Neues Element auf Basis des Templates erzeugen
            let dummy = document.createElement("div");

            // TODO: Inhalt des Templates #template-page-list-li anzeigen und
            // dabei die Platzhalter mit den anzuzeigenden Werten ersetzen

            /* Innere Funktion, damit den Event Listenern eine Kopie(!!) von
             * index übergeben wird. Andernfalls würde immer nur der letzte
             * Wert von index vom letzten Schleifendurchlauf übergeben werden.
             */
            let _addEventListeners = (index) => {
                // Event Listener für <div class="action edit"> registrieren
                let editButton = dummy.querySelector(".action.edit");
                editButton.addEventListener("click", () => this._app.showPage("page-edit", index));

                // Event Listener für <div class="action delete"> registrieren
                let deleteButton = dummy.querySelector(".action.delete");
                deleteButton.addEventListener("click", () => this._askDelete(index));
            };

            // TODO: Folgende Zeile wieder einkommentieren, wenn sonst alles läuft
            //_addEventListeners(index);

            // Eintrag nun anzeigen
            let li = dummy.firstElementChild;

            if (li) {
                dummy.removeChild(li);
                ol.appendChild(li);
            }
        });
    }

    /**
     * Löschen der übergebenen Adresse. Zeigt einen Popup, ob der Anwender
     * die Adresse löschen will und löscht diese dann.
     *
     * @param {Integer} index Index des zu löschenden Datensatzes
     */
    _askDelete(index) {
        // Sicherheitsfrage zeigen
        let answer = confirm("Soll die ausgewählte Adresse wirklich gelöscht werden?");
        if (!answer) return;

        // Datensatz löschen
        this._app.deleteDataByIndex(index);

        // Liste neu ausgeben
        this._renderList();
    }
}
