/**
 * Hauptklasse unseres Glücksradspiels.
 */
class WheelOfFortune {
    /**
     * Konstruktor.
     */
    constructor(quotes) {
        // Lösungsworte merken
        this.quotes = quotes;
        this._score = 0;
        this._quote = "";

        // Audio-Objekte für die verschiedenen Sounds
        this.hitSound = new Audio("snd/hit.ogg");
        this.failSound = new Audio("snd/fail.ogg");
        this.winSound = new Audio("snd/win.ogg");

        // TODO: Benötigte HTML-Elemente merken

        // TODO: Event Handler für Tastendruck

        // TODO: Auswahl des Lösungsworts anbieten
    }

    /**
     * Aktualisierung der aktuellen Punktzahl.
     */
    set score(score) {
        this._score = score;
        this.scoreDiv.textContent = `${score} Punkte`;
    }

    get score() {
        return this._score;
    }
}
