/**
 * Warten, bis die Seite komplett geladen wurde und dann erst die Initialisierungen
 * im JavaScript vornehmen. Sonst funktionieren die DOM-Zugriffe nicht.
 */
window.addEventListener("load", () => {
    let messagesElement = null;     // TODO: Element "#chatbox .messages" stattdessen zuweisen
    let inputElement = null;        // TODO: Element "#chatbox input" stattdessen zuweisen

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

        // TODO: Weitere Schlüsselwörter mit möglichen Antworten definieren
    };

    /**
     * Hilfsfunktion zur Ausgabe einer Chatnachricht.
     *
     * @param {Boolen} local true = Benutzer, false = Chatbot
     * @param {String} message Text der Chatnachricht
     */
    function postMessage(local, message) {
        // TODO: Neues <div>-Element erzeugen.
        // TODO: Inhalt des <div>-Elements mit dem Nachrichtentext belegen.
        // TODO: CSS-Klasse "local" zuweisen, wenn local === true, sonst "remote".
        // TODO: <div>-Element an messagesElement anhängen

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
        // Wörter trennen, in Großbuchstaben wandeln und Satzzeichen entfernen
        //let words = message.split(" ").map(word => word.toUpperCase().match(/\w*/)[0]);
        message = message.toUpperCase();

        // Keywords des Chatbots nach einem Treffer durchsuchen
        let possibleAnswers = [];

        if (message != "*") {
            possibleAnswers = possibleAnswers.concat(chatbotKeywords[""]);
        }

        // TODO: Schleife über alle Werte in Object.keys(chatbotKeywords)
        // TODO: Innerhalb der Schleife den Eintrag mit Keyword "" überspringen
        // TODO: Innerhalb der Schleife die Keyboards bei jedem "|" trennen
        // TODO: Schleife über die einzelnen, getrennten Keywords
        // TODO: Antworten an possibleAnswers anhängen, wenn ein Schlüsselwort in der Nachricht vorkommt

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

            // TODO: Vom Benutzer eingegebene Nachricht anzeigen lassen

            // Eingabefeld leeren
            event.target.value = "";

            // Antwort vom Chatbot generieren und anzeigen
            window.setTimeout(() => {
                // TODO: Antwort generieren und anzeigen lassen
            }, Math.floor(Math.random() * 3000));
        }
    });
});
