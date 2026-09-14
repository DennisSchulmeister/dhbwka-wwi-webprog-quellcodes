"use strict";

/**
 * Klasse PageAbout: Zeigt die Seite "Über uns".
 */
class PageAbout {
    /**
     * Konstruktor
     * @param {App} app Zentrale App-Instanz
     */
    constructor(app) {
        this._app = app;
    }

    /**
     * Vom Router aufgerufene Methode, um die Seite anzuzeigen.
     * @param {Array} matches Regex-Matches aus der URL
     */
    async show(matches) {
        this._app.setPageTitle("About");
        this._app.setPageContent("#page-about");
    }
}
