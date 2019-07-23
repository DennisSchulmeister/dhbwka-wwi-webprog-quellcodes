let cards = [];
let openCards = [];
let amount = 0;
let backsideUrl = "img/backside.jpg";

/* Start eines neuen Spiels.
 *
 * Es werden alle Bilder mit den Memorykarten im HTML-Dokument gesucht und im
 * Array „cards“ abgelegt. Das Array beinhaltet dabei je Karte ein Objekt mit
 * folgenden Attributen:
 *
 *   » imgElement: Das <img> aus dem HTML-Dokument
 *   » pictureFile: Dateiname des Bilds auf der Karte
 *   » open: Boolean, ob die Karte aufgedeckt wurde
 *
 * Schöner wäre eigentlich, die Zusatzinformationen zu den Bildern im Attribut
 * „dataset” der DOM-Objekte abzulegen. Das haben wir aber noch nicht kenne
 * gelernt. :-)
 *
 * Zusätzlich wird für jede Karte ein Event Listener registriert, um auf Klicks
 * zu reagieren.
 */
initGame = () => {
    // Alle Werte zurücksetzen
    cards = [];
    openCards = [];
    amount = 0;
    document.getElementById("amount").textContent = amount;

    // Karten mischen und merken
    let pictureUrls = [
        "img/card_01.jpg",
        "img/card_01.jpg",
        "img/card_02.jpg",
        "img/card_02.jpg",
        "img/card_03.jpg",
        "img/card_03.jpg",
        "img/card_04.jpg",
        "img/card_04.jpg",
        "img/card_05.jpg",
        "img/card_05.jpg",
        "img/card_06.jpg",
        "img/card_06.jpg",
        "img/card_07.jpg",
        "img/card_07.jpg",
        "img/card_08.jpg",
        "img/card_08.jpg",

    ];

    let cardImages = document.querySelectorAll("#card > img");

    cardImages.forEach(cardImage => {
        cardImage.src = backsideUrl;

        let i = Math.floor(Math.random() * pictureUrls.length);
        let url = pictureUrls[i];
        pictureUrls.splice(i, 1);

        cards.push({
            imgElement: cardImage,
            pictureUrl: url,
            open: false,
            matchFound: false,
        });

        cardImage.addEventListener("click", onCardClicked);
    });
}

window.addEventListener("load", initGame);

/**
 * Event Handler für das Click-Ereignis einer Karte. Hier wird die Karte
 * umgedreht (ihr Bild angezeigt) und geprüft, ob der Spieler ein Paar
 * gefunden hat.
 */
let onCardClicked = (event) => {
    // Eintrag der anklickten Karte in „cards“ suchen
    let card = null;

    for (let i = 0; i < cards.length; i++) {
        if (cards[i].imgElement == event.target) {
            card = cards[i];
            break;
        }
    }

    if (card === null) {
        console.error("Keine Daten zur angeklickten Karte gefunden!");
        return;
    }

    // Wenn die Karte schon zu einem gefundenen Paar gehört, die Karte nicht
    // wieder zuklappen. Warum sollte man das wollen? :-)
    if (card.matchFound) {
        return;
    }

    // Karte anzeigen, wenn sie noch nicht offen ist, sonst zuklappen.
    // Danach die Karte merken, oder wenn schon eine Karte offen liegt,
    // die beiden Karten miteinander vergleichen.
    compareCards(card);
    flipCard(card);
    restartGameIfWon();
}

/**
 * Hilfsfunktion zum Umdrehen einer Karte. Rein geht ein Eintrag aus dem
 * „cards“-Array. Liegt die Karte verdeckt, wird ihr Bild gezeigt. Andernfalls
 * ihre Rückseite.
 */
let flipCard = (card) => {
    if (!card.open) {
        // Karte aufdecken
        card.open = true;
        card.imgElement.src = card.pictureUrl;

        // Anzahl anzeigen
        document.getElementById("amount").textContent = ++amount;
    } else {
        // Karte zudecken
        card.open = false;
        card.imgElement.src = backsideUrl;
    }
}

/**
 * Hilfsfunktion zum Vergleichen der aufgeklappten Karten. Was hier passiert,
 * hängt davon ab, ob die Karte auf- oder zugeklappt wurde. Wurde die Karte
 * aufgeklappt (card.open ist true), passiert folgendes:
 *
 *     1. Die Karte wird am Ende von „openCards“ eingefügt.
 *
 *     2. Liegt keine andere Karte offen, passiert nichts.
 *
 *     3. Liegen zwei Karten offen, werden sie miteinander verglichen.
 *        Stimmen sie überein, bleiben sie offen und ihr „matchFound“-Attribut
 *        wird gesetzt. Stimmen sie nicht überein, bleibt die aktuelle Karte
 *        offen, die vorherige wird aber geschlossen.
 *
 * Wurde die Karte stattdessen zugeklappt, wird sie einfach aus „openCards”
 * entfernt und es passiert nichts weiter.
 */
let compareCards = (card) => {
    if (card.open) {
        // Karte wurde aufgeklappt. Daher erst mal merken.
        openCards.push(card);

        if (openCards.length == 2) {
            // Zwei Karten offen. Beide daher vergleichen
            if (openCards[0].pictureUrl === openCards[1].pictureUrl) {
                // Karten stimmen überein
                openCards[0].matchFound = true;
                openCards[1].matchFound = true;
                openCards = [];
            } else {
                // Karten stimmen nicht überein
                flipCard(openCards[0]);
                openCards.splice(0, 1);
            }
        }
    } else {
        // Karte wurde zugeklappt. Daher einfach aus „openCards“ entfernen.
        openCards = openCards.filter(c => c != card);
    }
}

/**
 * Prüfen, ob alle Karten gefunden wurde. Wenn ja, eine Meldung ausgeben und
 * das Spiel von vorne starten.
 */
let restartGameIfWon = () => {
    for (let i = 0; i < cards.length; i++) {
        if (!cards[i].matchFound) {
            return;
        }
    }

    window.alert("Herzlichen Glückwunsch. Du hast gewonnen!");
    initGame();
}
