"use strict";

import Page from "../page.js";

/**
 * Klasse PageList: Stellt die Listenübersicht zur Verfügung
 */
export default class PageList extends Page {
    /**
     * Konstruktor.
     *
     * @param {App} app Instanz der App-Klasse
     */
    constructor(app) {
        super(app, "page-list/page-list.html");

        this._emptyMessageElement = null;
    }

    /**
     * HTML-Inhalt und anzuzeigende Daten laden.
     *
     * HINWEIS: Durch die geerbte init()-Methode wird `this._mainElement` mit dem <main>-Element
     * aus der nachgeladenen HTML-Datei versorgt. Dieses Element wird dann auch von der App-Klasse
     * verwendet, um die Seite anzuzeigen. Hier muss daher einfach mit dem üblichen DOM-Methoden
     * `this._mainElement` nachbearbeitet werden, um die angezeigten Inhalte zu beeinflussen.
     */
    async init() {
        // HTML-Inhalt nachladen
        await super.init();
        this._title = "Übersicht";

        // Platzhalter anzeigen, wenn noch keine Daten vorhanden sind
        let data = await this._app.database.address.findAll();
        this._emptyMessageElement = this._mainElement.querySelector(".empty-placeholder");

        // TODO: Das eben ermittelte Platzhalter-Element ausblenden, wenn Datenbankeinträge vorliegen.
        // Hierzu muss dem Element die CSS-Klasse "hidden" hinzugefügt werden.

        // Je Datensatz einen Listeneintrag generieren
        let olElement = this._mainElement.querySelector("ol");

        let templateElement = this._mainElement.querySelector(".list-entry");
        let templateHtml = templateElement.outerHTML;
        templateElement.remove();

        for (let index in data) {
            // Platzhalter ersetzen
            let dataset = data[index];
            let html = templateHtml;

            // TODO: Die mit $ID$, $LAST_NAME$, … gekennzeichneten Platzhalter im HTML-Code
            // durch die tatsächlichen Werte des aktuellen Datensatzes ersetzen.

            // TODO: Den HTML-Code in die <ol>-Aufzählung einfügen, um ihn anzuzeigen.

            // TODO: Event Handler für die beiden Buttons registrieren. Folgender Code
            // soll ausgeführt werden, wenn einer der beiden Buttons angeklickt wird:
            //
            //   * Bearbeiten: location.hash = `#/edit/${dataset.id}`)
            //   * Löschen: this._askDelete(dataset.id)
        }
    }

    /**
     * Löschen der übergebenen Adresse. Zeigt einen Popup, ob der Anwender
     * die Adresse löschen will und löscht diese dann.
     *
     * @param {Integer} id ID des zu löschenden Datensatzes
     */
    async _askDelete(id) {
        // Sicherheitsfrage zeigen
        let answer = confirm("Soll die ausgewählte Adresse wirklich gelöscht werden?");
        if (!answer) return;

        // Datensatz löschen
        this._app.database.address.delete(id);

        // HTML-Element entfernen
        this._mainElement.querySelector(`[data-id="${id}"]`)?.remove();

        if (this._mainElement.querySelector("[data-id]")) {
            this._emptyMessageElement.classList.add("hidden");
        } else {
            this._emptyMessageElement.classList.remove("hidden");
        }
    }
};
