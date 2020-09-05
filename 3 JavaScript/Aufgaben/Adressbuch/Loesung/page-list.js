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
        this._mainElement.classList.remove("hidden");
    }

    /**
     * Seite nicht mehr anzeigen. Wird von der App-Klasse aufgerufen.
     */
    hide() {
        this._mainElement.classList.add("hidden");
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
            let template = document.getElementById("template-page-list-empty").innerHTML;
            ol.innerHTML = template;
            return;
        }

        // Datensätze einfügen
        let template = document.getElementById("template-page-list-li").innerHTML;
        let index = -1;

        data.forEach(dataset => {
            // Index hochzählen
            index++;

            // Neues Element auf Basis des Templates erzeugen
            let dummy = document.createElement("div");
            dummy.innerHTML = template;

            dummy.innerHTML = dummy.innerHTML.replace("$INDEX$", index);
            dummy.innerHTML = dummy.innerHTML.replace("$LAST_NAME$", dataset.last_name);
            dummy.innerHTML = dummy.innerHTML.replace("$FIRST_NAME$", dataset.first_name);
            dummy.innerHTML = dummy.innerHTML.replace("$PHONE$", dataset.phone);
            dummy.innerHTML = dummy.innerHTML.replace("$EMAIL$", dataset.email);

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

            _addEventListeners(index);

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
