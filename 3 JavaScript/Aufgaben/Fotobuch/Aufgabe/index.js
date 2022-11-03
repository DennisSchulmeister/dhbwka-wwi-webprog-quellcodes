window.addEventListener("load", async () => {
    let images = document.querySelectorAll("link[rel=preload][as=image]");
    let backgroundContainer = document.querySelector("#background");
    let previewContainer = document.querySelector("#preview");

    /**
     * Hilfsfunktion, zur einfacheren Nutzung von window.setTimeout().
     * Hierdurch kann eine Callback-Funktion eingespart werden, indem statt
     *
     *   window.setTimeout(() => { ... }, zeit);
     *
     * Folgender Quellcode verwendet wird:
     *
     *   await sleep(zeit);
     *   ...
     *
     * Die rufende Funktion muss hierfür mit async gekennzeichnet werden.
     *
     * @param {Number} ms Abzuwartende Zeit in Milisekunden
     */
    async function sleep(ms) {
        return new Promise(resolve => {
            window.setTimeout(() => resolve(), ms);
        });
    }

    /**
     * Wechsel des gerade sichtbaren Hintergrundbilds. Der Übgergang wird
     * mit Hilfe von CSS animiert.
     *
     * @param {Number} index Index im images-Array
     */
    async function showImage(index) {
        // TODO 4: Zunächst sollen alle Kinder des backgroundContainer gesucht
        // und in einer lokalen Variable zwischengespeichert werden. Sie werden
        // später noch gebraucht. In einer zusätzlichen Boolean-Variable soll
        // gespeichert werden, ob etwas gefunden wurde und somit später eine
        // Animation zur Überblendung des Bildes angezeigt werden soll.
        //
        // Das neue Hintergrundbild soll als <div>-Element dem backgroundContainer
        // hinzugefügt werden. Damit das Bild immer korrekt skaliert und zentriert
        // wird, muss es als Hintergrundbild des <div>-Elements gesetzt werden.
        // Das heißt, das Attribut style.backgroundImage zum Manipulieren der
        // CSS-Anweisung background-image muss mit dem richtigen Wert versorgt
        // werden.
        //
        // Die URL des sichtbaren Bilds kann anhand der <link>-Elemente aus dem
        // images-Array ermittelt werden. Dabei muss nur beachtet werden, dass
        // die URL im href-Attribut eines <link>-Elements steht.
        //
        // Im previewContainer soll das ausgewählte Bild die Klasse "current"
        // zugewiesen bekommen, damit es farblich hervorgehoben wird. Den anderen
        // Vorschaubildern muss die Klasse natürlich entfernt werden. Ebenso soll
        // den anderen Vorschaubildern die im Folgenden beschriebene Klasse "visible"
        // entfernt werden.
        //
        // Damit in der mobilen Ansicht immer genau drei Vorschaubilder sichtbar
        // sind, soll dem vorherigem und das nachfolgendem Bild die Klasse
        // "visible" zugewiesen werden. Jedoch wird eine Sonderbehandlung für
        // den Fall index == 0 und index == images.length - 1 benötigt, da das
        // erste und letzte Bild ja keinen Vorgänger bzw. Nachfolger besitzen,
        // aber dennoch drei Bilder angezeigt werden sollen.
        //
        // Schlussendlich soll der Wechsel des Hintergrundbilds animiert werden,
        // falls ganz am Anfang der Methode ein schon angezeigtes Bild gefunden
        // wurde. Hierbei muss wie folgt vorgegangen werden:
        //
        //   1. Dem <div> mit dem neuen Bild die Klasse "fadeout" geben.
        //
        //   2. 50 Milisekunden warten, damit die CSS-Regeln wirklich greifen.
        //
        //   3. Dem <div> die Klasse "fadeout" wieder wegnehmen.
        //
        //   4. Über alle am Anfang der Methode gefundenen, alten Inhalte
        //      eine Schleife bilden und diesen ebenfalls die Klasse "fadeout"
        //      zuweisen. Zusätzlich auf das Event "transitionend" der Elemente
        //      reagieren, um die Elemente nach Ablauf der Animation aus dem
        //      DOM zu entfernen.
    }

    // Auswahlelemente zum Umschalten des Bilds generieren:
    for (let i = 0; i < images.length; i++) {
        // TODO 2: Für jedes Bild soll ein <img>-Element erzeugt und dem previewContainer
        // hinzugefügt werden.
        //
        // Das Attribut dataset.index des <img>-Elements soll mit der Nummer des Bildes
        // aus der Variable i versorgt werden, damit bei einem Klick auf das Vorschaubild
        // diese an die Methode showImage() übergeben werden kann. Hierbei muss allerdings
        // beachtet werden, dass der im dataset.index-Attribut gespeicherte Wert immer in
        // einen String umgewandelt wird und daher vor dem Aufruf von showImage() mit
        // parseInt() erst wieder in einen Integer umgewandelt werden muss.
        //
        // Das Array images enthält die <link>-Elemente aus dem Header, mit denen die
        // anzuzeigenden Bilder definiert und vorgeladen werden. Die URL ist daher über
        // das href-Attribut zu ermitteln, muss aber dem src-Attribut des <img>-Elements
        // übergeben werden.
        //
        // Wenn das angeklickte Bild die Klasse "current" besitzt, soll nichts passieren.
        // Andernfalls soll das angeklicke Bild mit showImage() wie oben beschrieben
        // angezeigt werden.
    };

    // TODO 3: Erstes Bild anzeigen
});
