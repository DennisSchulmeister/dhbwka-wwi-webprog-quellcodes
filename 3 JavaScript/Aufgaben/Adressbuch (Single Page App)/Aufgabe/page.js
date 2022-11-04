"use strict";

/**
 * Basisklasse für eine Unterseite der App. Für jede Seite muss eine von dieser
 * Klasse erbende Klasse angelegt werden, damit sie angezeigt werden kann.
 * Dabei kann die Unterklasse das Template für die darzsutellenden Inhalte
 * automatisch aus einer separate HTML--Datei einlesen.
 *
 * Die Darstellung auf dem Bildschirm erfolgt durch die Methode _showPage()
 * der zentralen App-Klasse. Sie ruft dementsprechend die Methoden des
 * Page-Objekts auf, um die Inhalte zu ermitteln.
 */
export default class Page {
    /**
     * Konstruktor. Muss von den erbenden Klassen immer aufgerufen werden, um
     * das App-Objekt zu übergeben. Die erbenden Klassen sollten daher am
     * besten auch einen Konstruktor besitzen, dem das App-Objekt übergeben
     * wird. Der Parameter für die HTML--Datei sollte hingegen von der erbenden
     * Klasse versorgt werden.
     *
     * @param {App} app - Zentralles App-Objekt
     * @param {string} htmlFile - Absoluter Pfad des HTML-Templates
     */
    constructor(app, htmlFile) {
        this._app = app;

        this._htmlFile = htmlFile;
        this._title = "???";
        this._cssString = null;
        this._mainElement = null;
    }

    /**
     * Initialisierung der neuen Seite bei ihrem ersten Aufruf. Diese Methode
     * muss von den erbenden Klassen überschrieben werden, um anhand der
     * nachgeladenen HTML/CSS-Inhalte folgende Objektattribute mit Werten
     * zu versehen:
     *
     *   +---------------------+---------------+-----------------------------------------------+---------------+
     *   |  ATTRIBUT           |  TYP          |  INHALT                                       |               |
     *   +---------------------+---------------+-----------------------------------------------+---------------+
     *   |  this._title        |  String       |  Titel der Seite                              |               |
     *   |  this._cssString    |  String       |  CSS-Anweisungen der Seite                    |               |
     *   |  this._mainElement  |  DOM Element  |  HTML-Element für den Hauptbereich oder null  |               |
     *   +---------------------+---------------+-----------------------------------------------+---------------+
     *
     * Damit die HTML-Inhalte abgerufen werden, muss die geerbte Methode in der
     * redefinierten Methode aufgerufen und this._title mit dem Anzeigetitel
     * der Seite versorgt werden. Bei Bedarf kann dann das HTML-Element in
     * `this._mainElement` verändert werden, um den sichtbaren Inhalt zu
     * beeinflussen oder Event Handler zu registrieren.
     */
    async init() {
        // HTML-Datei der Seite nachladen
        let response = await fetch(this._htmlFile);

        if (!response.ok) {
            throw `HTTP ${response.status}: ${await response.text()}`;
        }

        let htmlString = await response.text();

        // Stylesheet und anzuzeigendes <main>-Element extrahieren
        let dummyElement = document.createElement("div");
        dummyElement.innerHTML = htmlString;

        this._cssString = dummyElement.querySelector("style")?.innerHTML;
        this._mainElement = dummyElement.querySelector("main");
        this._mainElement.remove();
    }

    /**
     * @returns {string} Titel der Seite
     */
    get title() {
        return this._title;
    }

    /**
     * @returns {string} Inhalt des CSS-Stylehseets
     */
    get css() {
        return this._cssString;
    }

    /**
     * @returns {DOMElement} HTML-Element für den Hauptbereich oder null
     */
    get mainElement() {
        return this._mainElement;
    }
}
