"use strict";

 /**
 * Hauptklasse der Anwendung. Sie erzeugte den Single Page Router und besitzt
 * eine Reihe von Hilfsmethoden, die an verschiedenen Stellen in der Anwendung
 * benötigt werden.
 */
class App {
    /**
     * Konstruktor.
     * @param {String} title Anzeigetitel der App
     */
    constructor(title) {
        this._title = title;
        this._router = new Router();
    }

    get router() {
        return this._router;
    }

    /**
     * Hilfsmethode, die von den anderen Klassen aufgerufen wird, um den
     * sichtbaren Titel der App zu ändern.
     *
     * @param {String} title Neuer Seitentitel
     */
    setPageTitle(title) {
        document.querySelectorAll(".page-name").forEach(e => e.textContent = title);
        document.title = `${title} – ${this._title}`;
    }

    /**
     * Hilfsmethode, die von den anderen Klassen aufgerufen wird, um den
     * sichtbaren Inhalt der App auszutauschen.
     *
     * @param {String} query Query String, um die anzuzeigenden Elemente zu finden
     */
    setPageContent(query) {
        document.querySelectorAll("main").forEach(e => e.classList.add("hidden"));
        document.querySelectorAll(query).forEach(e => e.classList.remove("hidden"));
    }
}
