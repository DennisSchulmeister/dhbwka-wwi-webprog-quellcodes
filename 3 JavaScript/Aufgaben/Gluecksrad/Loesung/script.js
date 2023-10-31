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
        this.hitSound  = new Audio("snd/hit.ogg");
        this.failSound = new Audio("snd/fail.ogg");
        this.winSound  = new Audio("snd/win.ogg");

        // Benötigte HTML-Elemente merken
        this.optionsDiv  = document.getElementById("options");
        this.scoreDiv    = document.getElementById("score");
        this.mainElement = document.querySelector("main");

        // Event Handler für Tastendruck
        let bodyElement = document.querySelector("body");
        bodyElement.addEventListener("keypress", event => this.onKeyPressed(event));

        // Auswahl des Lösungsworts anbieten
        this.createTopbarElements();
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

    /**
     * Hilfsmethode, mit der die Einträge in der Topbar zur Auswahl des
     * Lösungsworts erzeugt werden.
     */
    createTopbarElements() {
        for (let quote of this.quotes || []) {
            let divElement = document.createElement("div");
            divElement.classList.add("option");
            divElement.textContent = quote[0];
            this.optionsDiv.appendChild(divElement);
    
            divElement.addEventListener("click", () => this.startGame(quote[1]));
        }
    }

    /**
     * Start eines neuen Spiels.
     * @param {String} quote Das gesuchte Lösungswort
     */
    startGame(quote) {
        // Scorewert auf Null zurücksetzen
        this.score  = 0;
        this._quote = "";

        quote = quote.toUpperCase();

        // Kästchen für die Buchstaben erzeugen
        this.mainElement.innerHTML = "";

        for (let word of quote.split(" ")) {
            // <div class="word"> … </div> für das gesamte Wort
            let wordDiv = document.createElement("div");
            wordDiv.classList.add("word");
            this.mainElement.appendChild(wordDiv);

            // Je Buchstabe ein eigenes <div>
            for (let i = 0; i < word.length; i++) {
                let char = word[i];

                let charDiv = document.createElement("div");
                charDiv.classList.add("char");
                charDiv.dataset.char = char;

                if (!"ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜß".includes(char)) {
                    // Alles, was kein Buchstabe ist, direkt anzeigen
                    charDiv.textContent = char;
                } else {
                    // Buchstabe merken, um ihn später beim Drücken
                    // einer Taste als gesuchten Buchstaben zu erkennen
                    this._quote += char;
                }

                wordDiv.appendChild(charDiv);
            }
        }
    }

    /**
     * Event Handler für Tastaturereignisse.
     * @param  {Event} event Die Event-Struktur des Ereignisses
     */
    onKeyPressed(event) {
        // Nur weiter, wenn es ein Lösungswort gibt
        if (this._quote === "") return;

        // Gedrückte Taste ermitteln und prüfen
        let char = event.key.toUpperCase();

        if (this._quote.includes(char)) {
            // Treffer!
            this.score += 10;

            // Buchstabe aus der Liste entfernen
            this._quote = this._quote.split(char).join("");

            // Buchstabe anzeigen
            let charDivs = document.querySelectorAll(`.char[data-char='${char}']`);
            charDivs.forEach(charDiv => charDiv.textContent = char);

            // Sound abspielen
            if (this._quote.length > 0) {
                // Noch Buchstaben übrig
                this.hitSound.currentTime = 0;
                this.hitSound.play();
            } else {
                // Alle Buchstaben erraten
                this.winSound.currentTime = 0;
                this.winSound.play();
            }
        } else {
            // Kein Treffer!
            this.score -= 15;

            // Sound abspielen
            this.failSound.currentTime = 0;
            this.failSound.play();
        }
    }
}
