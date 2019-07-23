/**
 * Ansicht im Hauptbereich: Liste mit den Songs
 */
class ListView {
    /**
     * Konstruktor.
     *
     * @param {Player} player Instanz des Player-Hauptobjekts. Dieses Objekt
     *     beinhaltet interessante Dinge wie die Playlist oder Referenzen auf
     *     alle benötigten HTML-Elemente.
     */
    constructor(player) {
        this.player = player;
    }

    /**
     * View im Hauptbereich anzeigen. Beispiel für eine Liste mit zwei Songs:
     *     <div class="heading">
     *         <div class="cell title">Songtitel</div>
     *         <div class="cell artist">Künstler</div>
     *         <div class="cell duration">Dauer</div>
     *     </div>
     *     <div class="line playing">
     *         <div class="cell title">You Don't Need A Million Dollars</div>
     *         <div class="cell artist">Joe Cocker</div>
     *         <div class="cell duration">3:42</div>
     *     </div>
     *     <div class="line">
     *         <div class="cell title">I'll Be Your Doctor</div>
     *         <div class="cell artist">Joe Cocker</div>
     *         <div class="cell duration">4:12</div>
     *     </div>
     */
    display() {
        // Titelzeile erzeugen
        this.player.mainElement.classList.add("list");

        let headingDiv = document.createElement("div");
        headingDiv.classList.add("heading");
        this.player.mainElement.appendChild(headingDiv);

        let headingTitleDiv = document.createElement("div");
        headingTitleDiv.classList.add("cell");
        headingTitleDiv.classList.add("title");
        headingTitleDiv.textContent = "Songtitel";
        headingDiv.appendChild(headingTitleDiv);

        let headingArtistDiv = document.createElement("div");
        headingArtistDiv.classList.add("cell");
        headingArtistDiv.classList.add("artist");
        headingArtistDiv.textContent = "Künstler";
        headingDiv.appendChild(headingArtistDiv);

        let headingDurationDiv = document.createElement("div");
        headingDurationDiv.classList.add("cell");
        headingDurationDiv.classList.add("duration");
        headingDurationDiv.textContent = "Dauer";
        headingDiv.appendChild(headingDurationDiv);

        // Je Song eine Zeile erzeugen
        for (let i = 0; i < this.player.playlist.length; i++) {
            let song = this.player.playlist[i];

            let lineDiv = document.createElement("div");
            lineDiv.classList.add("line");
            lineDiv.dataset.index = i;
            this.player.mainElement.appendChild(lineDiv);

            lineDiv.addEventListener("click", event => {
                let clickedLine = event.target;

                while (!clickedLine.classList.contains("line")) {
                    clickedLine = clickedLine.parentNode;
                }

                this.player.play(parseInt(clickedLine.dataset.index));
            });

            let titleDiv = document.createElement("div");
            titleDiv.classList.add("cell");
            titleDiv.classList.add("title");
            titleDiv.textContent = song.title != "" ? song.title : "Kein Titel";
            lineDiv.appendChild(titleDiv);

            let artistDiv = document.createElement("div");
            artistDiv.classList.add("cell");
            artistDiv.classList.add("artist");
            artistDiv.textContent = song.artist != "" ? song.artist : "Unbekannt";
            lineDiv.appendChild(artistDiv);

            let durationDiv = document.createElement("div");
            durationDiv.classList.add("cell");
            durationDiv.classList.add("duration");
            durationDiv.textContent = song.duration != "" ? song.duration : "";;
            lineDiv.appendChild(durationDiv);
        }
    }

    /**
     * Aktuell wiedergegebenen Song setzen.
     *
     * @param {Objekt} index Index des aktuellen Songs oder -1
     */
    set currentSong(index) {
        // Aktiven Song mit der Klasse „playing” markieren
        document.querySelectorAll("main > *").forEach(listEntry => {
            listEntry.classList.remove("playing");

            if (index >= 0 && listEntry.dataset.index == index) {
                listEntry.classList.add("playing");
            }
        });
    }
}
