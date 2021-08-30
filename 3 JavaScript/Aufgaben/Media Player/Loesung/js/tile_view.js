/**
 * Ansicht im Hauptbereich: Je Song eine Kachel
 */
class TileView {
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
     * View im Hauptbereich anzeigen. Beispiel für zwei Kacheln:
     *
     *     <div class="tile playing">
     *         <img src="https://picsum.photos/300/200" />
     *
     *         <div class="footer">
     *             <div class="title">You Don't Need A Million Dollars Or More</div>
     *             <div class="artist">Joe Cocker</div>
     *         </div>
     *     </div>
     *     <div class="tile">
     *         <img src="https://picsum.photos/300/200" />
     *
     *         <div class="footer">
     *             <div class="title">You Don't Need A Million Dollars Or More</div>
     *             <div class="artist">Joe Cocker</div>
     *         </div>
     *     </div>
     */
    display() {
        this.player.mainElement.classList.add("tiles");
        this.player.mainElement.classList.remove("list");

        for (let i = 0; i < this.player.playlist.length; i++) {
            let song = this.player.playlist[i];

            let tileDiv = document.createElement("div");
            tileDiv.classList.add("tile");
            tileDiv.dataset.index = i;
            this.player.mainElement.appendChild(tileDiv);

            tileDiv.addEventListener("click", event => {
                let clickedTile = event.target;

                while (!clickedTile.classList.contains("tile")) {
                    clickedTile = clickedTile.parentNode;
                }

                this.player.play(parseInt(clickedTile.dataset.index));
            });

            if (song.cover != "") {
                let imgElement = document.createElement("img");
                imgElement.src = song.cover;
                tileDiv.appendChild(imgElement);
            }

            let footerDiv = document.createElement("div");
            footerDiv.classList.add("footer");
            tileDiv.appendChild(footerDiv);

            if (song.title != "") {
                let titleDiv = document.createElement("div");
                titleDiv.classList.add("title");
                titleDiv.textContent = song.title;
                footerDiv.appendChild(titleDiv);
            }

            if (song.artist != "") {
                let artistDiv = document.createElement("div");
                artistDiv.classList.add("artist");
                artistDiv.textContent = song.artist;
                footerDiv.appendChild(artistDiv);
            }
        }
    }

    /**
     * Aktuell wiedergegebenen Song setzen.
     *
     * @param {Objekt} index Index des aktuellen Songs oder -1
     */
    set currentSong(index) {
        // Aktiven Song mit der Klasse „playing” markieren
        document.querySelectorAll("main > *").forEach(tile => {
            tile.classList.remove("playing");

            if (index >= 0 && tile.dataset.index == index) {
                tile.classList.add("playing");
            }
        });
    }
}
