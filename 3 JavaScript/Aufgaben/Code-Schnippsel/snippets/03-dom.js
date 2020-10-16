let dom_html = `<html>
    <head>
        <title>Faszination Klavier</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <header>
            <h3>Faszination Klavier</h3>
        </header>
        <main>
            <h3>Wählen Sie eine Kategorie</h3>

            <div class="card">
                <img src="piano1.jpg" />
                <b>Das richtige Klavier finden</b>
            </div>
            <div class="card">
                <img src="piano2.jpg" />
                <b>Spielen mit zwei Händen</b>
            </div>
            <nav class="card">
                <h3>Kaufen</h3>
                <ul>
                    <li> <a>Gebrauchte Klaviere</a> </li>
                    <li> <a>Neue Klaviere</a> </li>
                </ul>
            </nav>
        </main>
        <footer>
            © Die Online-Klavierschule
            <nav>
                <ul>
                    <li> <a>Startseite</a> </li>
                    <li> <a>Das richtige Klavier finden</a> </li>
                </ul>
            </nav>
        </footer>
    </body>
</html>`

/**
 * querySelectorAll
 */
class DOMFunktionen1 {
    get description() {
        return html`
            <p>
                Ermittle alle <b><code>div</code></b>-Elemente mit der Klasse <b><code>card</code></b>
                und schreibe diese in eine globale Variable namens <b><code>cardElements</code></b>.
            </p>
        `;
    }

    get html() {
        return dom_html;
    }

    verify(iframe) {
        let error = "";
        let cardElements = iframe.contentWindow.cardElements;
        let success = false;

        if (cardElements) {
            success = true;
            let cards = iframe.contentWindow.document.querySelectorAll("div.card");

            if (!cardElements.length || (cards.length != cardElements.length)) {
                success = false;
            } else {
                for (let i = 0; i < cards.length; i++) {
                    if (cards[i] != cardElements[i]) {
                        success = false;
                        break;
                    }
                }
            }
        }

        if (!cardElements) {
            error = "Variable <b><code>cardElements</code></b> existiert nicht oder besitzt keinen Inhalt.";
        } else if (!success) {
            error = `Variable <b><code>cardElements</code></b> beinhaltet den falschen Inhalt.`;
        }

        return error;
    }
}

/**
 * Elemente entfernen
 */
class DOMFunktionen2 {
    get description() {
        return html`
            <p>
                Entferne all <b><code>nav</code></b> aus dem Document Object Model.
            </p>
        `;
    }

    get html() {
        return dom_html;
    }

    verify(iframe) {
        let error = "";
        let navElements = iframe.contentWindow.document.querySelectorAll("nav");

        if (navElements.length) {
            error = `Es sind noch ${navElements.length} <b><code>nav</code></b>-Elemente in der Seite enthalten.`;
        }

        return error;
    }
}

/**
 * Text ändern
 */
class DOMFunktionen3 {
    get description() {
        return html`
            <p>
                Ändere die Überschrift im Header zu <b><code>"Piano-Haus"</code></b>.
            </p>
        `;
    }

    get html() {
        return dom_html;
    }

    verify(iframe) {
        let error = "";
        let headingElement = iframe.contentWindow.document.querySelector("header h3");

        if (!headingElement) {
            error = `Die Überschrift fehlt nun komplett.`;
        } else if (headingElement.textContent != "Piano-Haus") {
            error = `Die Überschrift enthält den falschen Text <b><code>${headingElement.textContent}</code></b>.`;
        }

        return error;
    }
}

/**
 * Elemente hinzufügen
 */
class DOMFunktionen4 {
    get description() {
        return html`
            <p>
                Füge dem Footer einen Absatz mit beliebigem Text hinzu.
            </p>
        `;
    }

    get html() {
        return dom_html;
    }

    verify(iframe) {
        let error = "";
        let pElement = iframe.contentWindow.document.querySelector("footer p");

        if (!pElement) {
            error = "Der Footer beinhaltet keinen Absatz.";
        } else if (pElement.textContent === "") {
            error = "Der Absatz beinhaltet keinen Text.";
        }

        return error;
    }
}
