"use strict";

import Page from "../page.js";
import {AddressEntity} from "../entity.js";

/**
 * Klasse PageEdit: Stellt die Seite zum Anlegen oder Bearbeiten einer Adresse
 * zur Verfügung.
 */
export default class PageEdit extends Page {
    /**
     * Konstruktor.
     *
     * @param {App} app Instanz der App-Klasse
     * @param {Integer} editId ID des bearbeiteten Datensatzes
     */
    constructor(app, editId) {
        super(app, "page-edit/page-edit.html");

        // Bearbeiteter Datensatz
        this._editId = editId;
        this._dataset = new AddressEntity();

        // Eingabefelder
        this._firstNameInput = null;
        this._lastNameInput  = null;
        this._phoneInput     = null;
        this._emailInput     = null;
    }

    /**
     * HTML-Inhalt und anzuzeigende Daten laden.
     *
     * HINWEIS: Durch die geerbte init()-Methode wird `this._mainElement` mit
     * dem <main>-Element aus der nachgeladenen HTML-Datei versorgt. Dieses
     * Element wird dann auch von der App-Klasse verwendet, um die Seite
     * anzuzeigen. Hier muss daher einfach mit dem üblichen DOM-Methoden
     * `this._mainElement` nachbearbeitet werden, um die angezeigten Inhalte
     * zu beeinflussen.
     *
     * HINWEIS: In dieser Version der App wird mit dem üblichen DOM-Methoden
     * gearbeitet, um den finalen HTML-Code der Seite zu generieren. In größeren
     * Apps würde man ggf. eine Template Engine wie z.B. Nunjucks integrieren
     * und den JavaScript-Code dadurch deutlich vereinfachen.
     */
    async init() {
        // HTML-Inhalt nachladen
        await super.init();

        // Bearbeiteten Datensatz laden
        if (this._editId) {
            this._dataset = await this._app.database.address.findById(this._editId);
            this._title = `${this._dataset.firstName} ${this._dataset.lastName}`;
        } else {
            this._title = "Adresse hinzufügen";
        }

        // Platzhalter im HTML-Code ersetzen
        let html = this._mainElement.innerHTML;
        html = html.replace("$LAST_NAME$", this._dataset.lastName);
        html = html.replace("$FIRST_NAME$", this._dataset.firstName);
        html = html.replace("$PHONE$", this._dataset.phone);
        html = html.replace("$EMAIL$", this._dataset.email);
        this._mainElement.innerHTML = html;

        // Event Listener registrieren
        let saveButton = this._mainElement.querySelector(".action.save");
        saveButton.addEventListener("click", () => this._saveAndExit());

        // Eingabefelder zur späteren Verwendung merken
        this._firstNameInput = this._mainElement.querySelector("input.first_name");
        this._lastNameInput  = this._mainElement.querySelector("input.last_name");
        this._phoneInput     = this._mainElement.querySelector("input.phone");
        this._emailInput     = this._mainElement.querySelector("input.email");
    }

    /**
     * Speichert den aktuell bearbeiteten Datensatz und kehrt dann wieder
     * in die Listenübersicht zurück.
     */
    async _saveAndExit() {
        // Eingegebene Werte prüfen
        this._dataset.id        = this._editId;
        this._dataset.firstName = this._firstNameInput.value.trim();
        this._dataset.lastName  = this._lastNameInput.value.trim();
        this._dataset.phone     = this._phoneInput.value.trim();
        this._dataset.email     = this._emailInput.value.trim();

        if (!this._dataset.firstName) {
            alert("Geben Sie erst einen Vornamen ein.");
            return;
        }

        if (!this._dataset.lastName) {
            alert("Geben Sie erst einen Nachnamen ein.");
            return;
        }

        // Datensatz speichern
        await this._app.database.address.save(this._dataset);

        // Zurück zur Übersicht
        location.hash = "#/";
    }
};
