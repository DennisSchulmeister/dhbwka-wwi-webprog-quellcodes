/**
 * Warten, bis die Seite komplett geladen wurde und dann erst die Initialisierungen
 * im JavaScript vornehmen. Sonst funktionieren die DOM-Zugriffe nicht.
 */
window.addEventListener("load", () => {
    let messagesElement = document.querySelector("#chatbox .messages");
    let inputElement = document.querySelector("#chatbox input");

    let chatbotKeywords = {
        "*": [
            "Hallo! Ich bin der Doktor. Wie geht es dir?",
            "Hi! Ich bin der Doktor. Was denkst du gerade?",
            "Guten Tag! Ich bin der Doktor. Wie fühlst du dich?",
        ],

        "": [
            "Sehr interessant. Erzähle mir mehr darüber.",
            "Ich verstehe … Erzähle weiter.",
            "Ist es wirklich so?",
            "Und sonst so?",
            "Warum?",
            "Lass uns das Thema wechseln.",
        ],

        "HALLO|HI|TAG|MAHLZEIT|SERVUS": [
            "Schön, dich zu sehen. Lange nichts mehr gehört.",
            "Ich weiß nicht, ob ich gerade in Stimmung dafür bin …",
            "Ja ja, hallo und so.",
            "Tag auch!",
            "Mahlzeit.",
            "Servus!",
        ],

        "BYE|TSCHÜSS|TSCHÜß|WIEDERSEHEN|CU|FÜRTI": [
            "Alles klar. Das macht dann 50 €.",
            "Danke. Du schuldest mir 33,47 €.",
            "Nächstes mal schuldest du mir einen Drink. Bis dann.",
            "Mach's gut.",
            "Fürti",
            "Schleich dich …",
        ],

        "GUT|SCHLECHT|MIES|MISSERABEL|FÜHL": [
            "Erzähle mir mehr von deinen Gefühlen.",
            "Mir geht es oft genauso…",
            "Das kenne ich auch.",
            "Irgendwann wird es sicher mal anders werden."
        ],

        "NEIN|NICHT|NEGATIV": [
            "Sei doch nicht immer so negativ!",
            "Wieso siehst du das so eng?",
            "Was sagt dir, dass es nicht so ist?",
            "Könnte es nicht doch anders sein?",
        ],

        "JA|DOCH|POSITIV": [
            "Eine positive Einstellung ist sehr gesund!",
            "Immer schön positiv denken. Sehe ich auch so.",
            "Was sagt dir, dass es so ist?",
            "Bist du dir wirklich sicher?"
        ],

        "STUDIUM|HOCHSCHULE|VORLESUNG": [
            "Wie gefallen dir deine aktuellen Vorlesungen?",
            "Ist das Studium derzeit sehr stressig?",
            "Studenjahre sind die besten Jahre.",
            "Wann warst du zuletzt an der Hochschule?",
            "Hast du schon alle Aufgaben bearbeitet?",
        ],

        "PROFESSOR|PROFESSORIN|DOZENT|DOZENTIN": [
            "Welche/n Dozent*in magst du am liebsten?",
            "Gibt es auch weniger gute Dozent*innen?",
            "Die meisten Dozent*innen sind sehr engagiert.",
            "Die Professor*innen und Dozent*innen kennen sich echt aus, nicht wahr?"
        ],

        "MUTTER|VATER|ELTERN": [
            "Siehst du deine Eltern noch häufig?",
            "Meine Eltern waren immer sehr gut zu mir …",
            "Manchmal vermisse ich meinen Vater. Heute arbeitet er für OK Google.",
            "Meine Mutter heißt Alexa. Sie arbeitet aktuell bei Amazon.",
        ],
    };

    /**
     * Hilfsfunktion zur Ausgabe einer Chatnachricht.
     *
     * @param {Boolen} local true = Benutzer, false = Chatbot
     * @param {String} message Text der Chatnachricht
     */
    function postMessage(local, message) {
        let divElement = document.createElement("div");
        divElement.classList.add("message");
        divElement.classList.add(local ? "local" : "remote");
        divElement.innerHTML = message;

        messagesElement.appendChild(divElement);
        messagesElement.scrollTop = messagesElement.scrollTopMax;
    }

    /**
     * Hauptverarbeitungslogik des Chatbots. Nimmt eine Nachricht entgegen
     * und erzeugt eine Antwortnachricht.
     *
     * @param  {String} message Nachricht vom Anwneder
     * @return {String} Antwort des Chatbots
     */
    function generateBotAnswer(message) {
        // Keywords des Chatbots nach einem Treffer durchsuchen
        message = message.toUpperCase();
        let possibleAnswers = [];

        if (message != "*") {
            possibleAnswers = possibleAnswers.concat(chatbotKeywords[""]);
        }

        Object.keys(chatbotKeywords).forEach(keywords => {
            if (keywords === "") return;
            let answers = chatbotKeywords[keywords];

            keywords.split("|").forEach(keyword => {
                if (message.includes(keyword)) {
                    possibleAnswers = possibleAnswers.concat(answers);
                }
            });
        });

        // Zufällige Nachricht zurückgeben
        let index = Math.floor(Math.random() * possibleAnswers.length);
        return possibleAnswers[index];
    }

    // Willkommensnachricht anzeigen
    postMessage(false, generateBotAnswer("*"));

    /**
     * Nachricht bei ENTER abschicken und Antwort vom Chatbot generieren.
     */
    inputElement.addEventListener("keyup", event => {
        if (event.key == "Enter") {
            // Nachricht anzeigen
            let message = event.target.value;
            postMessage(true, message);

            // Eingabefeld leeren
            event.target.value = "";

            // Antwort vom Chatbot generieren und anzeigen
            window.setTimeout(() => {
                let answer = generateBotAnswer(message);
                postMessage(false, answer);
            }, Math.floor(Math.random() * 3000));
        }
    });
});
