"use strict";

import Database from "./database.js";
import Router from "./router.js";

/**
 * Hauptklasse App: Steuert die gesamte Anwendung
 *
 * Diese Klasse erzeugt den Single Page Router zur Navigation innerhalb
 * der Anwendung und ein Datenbankobjekt zur Verwaltung der Adressliste.
 * Darüber hinaus beinhaltet sie verschiedene vom Single Page Router
 * aufgerufene Methoden, zum Umschalten der aktiven Seite.
 */
class App {
    /**
     * Konstruktor.
     */
    constructor() {
        // Datenbank-Klasse zur Verwaltung der Datensätze
        this.database = new Database();

        // Single Page Router zur Steuerung der sichtbaren Inhalte
        this.router = new Router([
            // TODO: URL-Routen definieren. Für jede Route muss ein Objektliteral
            // mit den beiden Attributen `url` und `show` übergeben werden. `url`
            // ist ein regulärer Ausdruck zum Prüfen der URL (alles, was nach dem
            // Rautezeichen kommt), `show` eine Rückruffunktion, die bei einem
            // positiven Treffer aufgerufen wird.
            //
            // Folgende URL-Routen werden benötigt:
            //
            // +----------------------+------------------+-----------------------------------------+
            // |  BEZEICHNUNG         |  REGEXP          |  CALLBACK                               |
            // +----------------------+------------------+-----------------------------------------+
            // |  Startseite          |  "^/$"           |  () => this._gotoList()                 |
            // |  Adresse anlegen     |  "^/new/$"       |  () => this._gotoNew()                  |
            // |  Adresse bearbeiten  |  "^/edit/(.*)$"  |  matches => this._gotoEdit(matches[1])  |
            // |  Unbekannte URL      |  ".*"            |  () => this._gotoList()                 |
            // +----------------------+------------------+-----------------------------------------+
        ]);

        // Fenstertitel merken, um später den Name der aktuellen Seite anzuhängen
        this._documentTitle = document.title;

        // Von dieser Klasse benötigte HTML-Elemente
        this._pageCssElement = document.querySelector("#page-css");
        this._bodyElement = document.querySelector("body");
        this._menuElement = document.querySelector("#app-menu");
    }

    /**
     * Initialisierung der Anwendung beim Start. Im Gegensatz zum Konstruktor
     * der Klasse kann diese Methode mit der vereinfachten async/await-Syntax
     * auf die Fertigstellung von Hintergrundaktivitäten warten, ohne dabei
     * mit den zugrunde liegenden Promise-Objekten direkt hantieren zu müssen.
     */
    async init() {
        await this.database.init();

        // TODO: Single Page Router starten
    }

    /**
     * Übersichtsseite anzeigen. Wird vom Single Page Router aufgerufen.
     */
    async _gotoList() {
        try {
            // TODO: Klasse PageList aus dem Modul "./page-list/page-list.js" importieren.
            // Vgl. hierzu https://javascript.info/modules-dynamic-imports

            // TODO: Neue Instanz von der Klasse PageList erzeugen und die init-Methode aufrufen.
            // Dabei beachten, dass die Methode init() asynchron ist und erst ihr erfolgreiches
            // Ende abgewartet werden muss, bevor der nächste Schritt ausgeführt wird.

            // TODO: Methode this._showPage() mit dem eben erzeugten Objekt aufrufen. Als zweiter
            // Parameter muss "list" als technischer Name der Seite übergeben werden, damit der
            // dazugehörige Menüeintrag farblich hervorgehoben wird.
        } catch (ex) {
            this._showException(ex);
        }
    }

    /**
     * Seite zum Anlegen einer neuen Adresse anzeigen.  Wird vom Single Page
     * Router aufgerufen.
     */
    async _gotoNew() {
        try {
            // TODO: Klasse PageEdit aus dem Modul "./page-edit/page-edit.js" importieren.
            // Vgl. hierzu https://javascript.info/modules-dynamic-imports

            // TODO: Neue Instanz von der Klasse PageEdit erzeugen und die init-Methode aufrufen.
            // Dabei beachten, dass die Methode init() asynchron ist und erst ihr erfolgreiches
            // Ende abgewartet werden muss, bevor der nächste Schritt ausgeführt wird.

            // TODO: Methode this._showPage() mit dem eben erzeugten Objekt aufrufen. Als zweiter
            // Parameter muss "new" als technischer Name der Seite übergeben werden, damit der
            // dazugehörige Menüeintrag farblich hervorgehoben wird.
        } catch (ex) {
            this._showException(ex);
        }
    }

    /**
     * Seite zum Bearbeiten einer Adresse anzeigen.  Wird vom Single Page
     * Router aufgerufen.
     *
     * @param {Number} id ID der zu bearbeitenden Adresse
     */
    async _gotoEdit(id) {
        try {
            // Dynamischer Import, vgl. https://javascript.info/modules-dynamic-imports
            let {default: PageEdit} = await import("./page-edit/page-edit.js");

            let page = new PageEdit(this, id);
            await page.init();
            this._showPage(page, "edit");
        } catch (ex) {
            this._showException(ex);
        }
    }

    /**
     * Interne Methode zum Umschalten der sichtbaren Seite.
     *
     * @param  {Page} page Objekt der anzuzeigenden Seiten
     * @param  {String} name Name zur Hervorhebung der Seite im Menü
     */
    _showPage(page, name) {
        // Fenstertitel aktualisieren
        document.title = `${this._documentTitle} – ${page.title}`;

        // Stylesheet der Seite einfügen
        this._pageCssElement.innerHTML = page.css;

        // Aktuelle Seite im Kopfbereich hervorheben
        this._menuElement.querySelectorAll("li").forEach(li => li.classList.remove("active"));
        this._menuElement.querySelectorAll(`li[data-page-name="${name}"]`).forEach(li => li.classList.add("active"));

        // Sichtbaren Hauptinhalt austauschen
        // TODO: Das bisherige <main>-Element aus this._bodyElement entfernen.
        // TODO: Das neue Element page.mainElement an this._bodyElement anhängen.
    }

    /**
     * Hilfsmethode zur Anzeige eines Ausnahmefehlers. Der Fehler wird in der
     * Konsole protokolliert und als Popupmeldung angezeigt.
     *
     * @param {Object} ex Abgefangene Ausnahme
     */
    _showException(ex) {
        console.error(ex);
        alert(ex.toString());
    }
}

/**
 * Anwendung starten
 */
window.addEventListener("load", async () => {
    let app = new App();
    await app.init();
});
