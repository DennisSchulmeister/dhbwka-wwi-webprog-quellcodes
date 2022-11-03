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
     * Wechsel des gerade sichtbaren Hintergrundbilds. Der Übergang wird
     * mit Hilfe von CSS animiert.
     *
     * @param {Number} index Index im images-Array
     */
    async function showImage(index) {
        // Vorhandenes Hintergrundbild ermitteln
        let existingElements = backgroundContainer.querySelectorAll("*");
        let animateTransition = existingElements.length > 0;

        // Neues Hintergrundbild einfügen
        let divElement = document.createElement("div");
        divElement.style.backgroundImage = `url(${images[index].href})`;
        backgroundContainer.appendChild(divElement);

        // Dazugehöriges Vorschaubild hervorheben und sicherstellen, dass in
        // der mobilen Ansicht auch das Bild davor und danach ausgewählt werden
        // kann. In der Mobilansicht werden hierfür immer exkt drei Vorschau-
        // Bilder angezeigt.
        for (let previewImage of previewContainer.querySelectorAll("img")) {
            previewImage.classList.remove("visible");
            previewImage.classList.remove("current");
        }

        previewContainer.querySelector(`[data-index='${index - 1}']`)?.classList.add("visible");
        previewContainer.querySelector(`[data-index='${index + 0}']`)?.classList.add("current");
        previewContainer.querySelector(`[data-index='${index + 1}']`)?.classList.add("visible");

        if (index == 0) {
            previewContainer.querySelector(`[data-index='${index + 2}']`)?.classList.add("visible");
        } else if (index == images.length - 1) {
            previewContainer.querySelector(`[data-index='${index - 2}']`)?.classList.add("visible");
        }

        // Keine Überblendung beim ersten Aufruf, da in diesem Fall
        // noch kein altes Hintergrundbild sichtbar ist und ein Einblenden
        // beim Laden der Seite doof aussieht.
        if (!animateTransition) return;

        divElement.classList.add("fadeout");
        await sleep(50);
        divElement.classList.remove("fadeout");

        for (let existingElement of existingElements) {
            existingElement.addEventListener("transitionend", event => event.target.remove());
            existingElement.classList.add("fadeout");
        }
    }

    // Auswahlelemente zum Umschalten des Bilds generieren
    for (let i = 0; i < images.length; i++) {
        let imgElement = document.createElement("img");
        imgElement.src = images[i].href;
        imgElement.dataset.index = i;
        previewContainer.appendChild(imgElement);

        imgElement.addEventListener("click", () => {
            if (imgElement.classList.contains("current")) return;
            showImage(parseInt(imgElement.dataset.index));
        });
    };

    // Erstes Bild anzeigen
    showImage(0);
});
