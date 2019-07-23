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

        //// TODO: Je Song eine Kachel erzeugen, wie im Kommentar oben beschrieben
        this.player.mainElement.textContent = "Die Kachelansicht müssen Sie erst programmieren. Liste geht schon. 🐻";
        ////
    }

    /**
     * Aktuell wiedergegebenen Song setzen.
     *
     * @param {Objekt} index Index des aktuellen Songs oder -1
     */
    set currentSong(index) {
        //// TODO: Aktiven Song mit der Klasse „playing” markieren
    }
}
