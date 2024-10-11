"use strict";

/**
 * Diese Klasse stellt einen so genannten Single Page Router dar. Sie überwacht
 * die momentan aktive URL (die sich durch Anklicken eines Links oder durch
 * Setzen von window.location.href in JavaScript jederzeit ändern kann) und
 * sorgt dafür, dass der für die jeweilige URL richtige Inhalt angezeigt wird.
 *
 * Hierzu muss der Klasse bei ihrer Instantiierung eine Liste mit Routen
 * mitgegeben werden, die jeweils einen regulären Ausdrück zur Prüfung der
 * URL sowie eine Funktion zur Anzeige des dazugehörigen Inhalts besitzen.
 */
class Router {
    /**
     * Konstruktor.
     */
    constructor() {
        this._routes = [];
    }

    /**
     * Methode zur Konfiguration das SPA-Routers. Erwartet als einzigen
     * Parameter ein Array mit URL-Definitionen, wie im folgenden Beispiel_
     *
     *      [
     *          {
     *              url: "^/$"              // Regex zur Prüfung der URL
     *              klass: PageOverview     // Klasse zum Anzeigen der Seite
     *          }, {
     *              url: "^/Details/(.*)$"  // Regex zur Prüfung der URL
     *              klass: PageDetails      // Klasse zum Anzeigen der Seite
     *          },
     *          ...
     *      ]
     * @param {Array} routes URL-Routen
     */
    setUrlRoutes(routes) {
        this._routes = routes;
    }

     /**
      * Starte Single Page Router und zeige erste Seite an.
      */
    run() {
        window.addEventListener("hashchange", () => this._handleRouting());
        this._handleRouting();
    }

    /**
     * Das Herzstück des Single Page Routers. Nutzt eine ziemlich triviale
     * Implementierung, die auf Änderungen nach dem ersten Hash-Zeichen in
     * der URL vorkommen.
     */
    _handleRouting() {
        let pageUrl = location.hash.slice(1);

        if (pageUrl.length === 0) {
            pageUrl = "/";
        }

        let matches = null;
        let route = this._routes.find(p => matches = pageUrl.match(p.url));

        if (!route) {
            console.error(`Keine Seite zur URL ${pageUrl} gefunden!`);
            return;
        }

        route.obj.show(matches);
    }
}
