/**
 * Hauptobjekt der Anwendung. Aktualisiert die Oberfläche und spielt die Musik.
 */
class Player {
    /**
     * Konstruktor.
     * @param {List} playlist Vom Server abgerufene Playlist im JSON-Format
     */
    constructor(playlist, prefix) {
        // Playliste und aktueller Song
        this.playlist = playlist;
        this.prefix = prefix;
        this.currentSong = 0;
        this.firstTime = true;
        this.audio = new Audio();

        this.audio.addEventListener("playing", () => this.showSongTitle());
        this.audio.addEventListener("ended", () => this.showPlayerStatus());
        this.audio.addEventListener("pause", () => this.showPlayerStatus());
        this.audio.addEventListener("timeupdate", () => this.showPlayerStatus());
        this.audio.addEventListener("ended", () => this.playNextSong());

        // Benötigte HTML-Elemente merken
        this.headerH1Element = document.querySelector("header h1");
        this.mainElement = document.querySelector("main");

        this.playButton = document.querySelector("#controls button.play");
        this.stopButton = document.querySelector("#controls button.stop");
        this.statusDiv = document.querySelector("#controls .status");
        this.showTilesLink = document.querySelector("#controls .show-tiles > a");
        this.showListLink = document.querySelector("#controls .show-list > a");

        this.playButton.addEventListener("click", () => this.play(-1));
        this.stopButton.addEventListener("click", () => this.stop());

        // Views im Hauptbereich initialisieren
        this.view = null;
        this.switchView("tiles");
        this.showPlayerStatus();

        this.showTilesLink.addEventListener("click", () => this.switchView("tiles"));
        this.showListLink.addEventListener("click", () => this.switchView("list"));
    }

    /**
     * Wechsel zwischen Kachel- und Listenansicht
     * @param {String} view "tiles" für Kacheln oder "list" für die Liste
     */
    switchView(view) {
        // Alten Inhalte verwerfen
        this.mainElement.innerHTML = "";
        this.mainElement.class = "";

        this.showTilesLink.classList.remove("active");
        this.showListLink.classList.remove("active");

        // Neue View erzeugen und anzeigen
        if (view === "tiles") {
            this.view = new TileView(this);
            this.showTilesLink.classList.add("active");
        } else if (view === "list") {
            this.view = new ListView(this);
            this.showListLink.classList.add("active");
        } else {
            console.error(`Unbekannter Viewtyp: ${view}`);
            return;
        }

        this.view.display();

        // Aktuellen Song an die View melden
        if (this.currentSong < 0) {
            this.view.currentSong = -1;
        } else {
            this.view.currentSong = this.currentSong;
        }
    }

    /**
     * Song mit der gegebenen URL (aus der Playlist) abspielen
     * @param {Integer} index Index des Songs oder -1 für aktuellen Song
     * @param {boolean} rewind Wiedergabe bei 0:00 beginnen
     */
    play(index) {
        // Eintrag in der Trefferliste suchen
        let song = null;

        if (this.playlist.length < 1) {
            console.error("Keine Songs in der Playlist vorhanden!");
            return;
        } else if (index < 0) {
            // Keine URL mitgegeben: Bei aktuellem Song weiter
            song = this.playlist[this.currentSong];

            if (this.firstTime) {
                this.firstTime = false;
                this.audio.currentTime = 0;
                this.audio.src = `${this.prefix}/${song.url}`;
            }
        } else {
            this.currentSong = index;
            song = this.playlist[index];
            this.audio.currentTime = 0;
            this.audio.src = `${this.prefix}/${song.url}`;
        }

        if (!song) {
            console.error("Song in der Playlist nicht gefunden!");
            return;
        }

        // Wiedergabe starten
        this.audio.pause();
        this.audio.play();
    }

    /**
     * Wiedergabe stoppen.
     */
    stop() {
        this.audio.pause();
    }

    /**
     * Aktuellen Songtitel anzeigen
     */
    showSongTitle() {
        if (this.playlist[this.currentSong]) {
            let song = this.playlist[this.currentSong];
            this.headerH1Element.textContent = `${song.artist}: ${song.title}`;
            this.view.currentSong = this.currentSong;
        } else {
            this.headerH1Element.textContent = "Wiedergabeliste ist leer";
            this.view.currentSong = -1;
        }
    }
    /**
     * Aktuellen Status des Players anzeigen: Position im Song, Play/Stop-Button
     */
    showPlayerStatus() {
        if (this.audio.paused) {
            this.playButton.classList.remove("invisible");
            this.stopButton.classList.add("invisible");
            this.statusDiv.textContent = "--:--";
        } else {
            this.playButton.classList.add("invisible");
            this.stopButton.classList.remove("invisible");

            let posMin = Math.floor(this.audio.currentTime / 60);
            let posSec = Math.floor(this.audio.currentTime) - (posMin * 60);
            if (posMin < 10) { posMin = "0" + String(posMin); }
            if (posSec < 10) { posSec = "0" + String(posSec); }
            this.statusDiv.textContent = `${posMin}:${posSec}`;
        }
    }

    /**
     * Automatische Wiedergabe des nächsten Songs starten, nachdem der vorherige
     * zu Ende gelaufen ist.
     */
    playNextSong() {
        this.currentSong++;

        if (this.currentSong >= this.playlist.length) {
            this.currentSong = 0;
            this.stop();
        } else {
            this.play(this.currentSong);
        }
    }
}
