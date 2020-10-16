/**
 * Einfache Funktion definieren.
 */
class SnippetFunktionen1 {
    get description() {
        return html`
            <p>
                Lege eine Funktion mit dem Namen <b><code>getRandomNumber()</code></b>
                an, die immer den Wert 42 zurückliefert.
            </p>
        `;
    }

    get html() {
        return html`<!-- Kein HTML-Code notwendig -->`;
    }

    verify(iframe) {
        let error = "";
        let getRandomNumber = iframe.contentWindow.getRandomNumber;
        let result = null;

        if (getRandomNumber) {
            result = getRandomNumber();
        }

        if (!getRandomNumber) {
            error = "Funktion <b><code>getRandomNumber</code></b> existiert nicht.";
        } else if (result !== 42) {
            error = `Funktion <b><code>getRandomNumber</code></b> liefert das falsche Ergebnis <b><code>${result}</code></b>.`;
        }

        return error;
    }
}

/**
 * Funktion mit Fallunterscheidung
 */
class SnippetFunktionen2 {
    get description() {
        return html`
            <p>
                Definiere eine Funktion mit dem Namen <b><code>checkTempearature()</code></b>
                an, die als Parameter eine Temparatur in Grad Celsius übergeben bekommt.
                Je nach Wert der übergebenen Temparatur soll sie einen der folgenden Strings
                zurückliefern:
            </p>
            <ul>
                <li><b>Kleiner oder gleich 10:</b> <code>"Kalt"</code></li>
                <li><b>Zwischen 11 und 20:</b> <code>"Etwas frisch"</code></li>
                <li><b>Zwischen 21 und 31:</b> <code>"Genau richtig"</code></li>
                <li><b>Größer oder gleich 32:</b> <code>"Heiß"</code></li>
            </ul>
        `;
    }

    get html() {
        return html`<!-- Kein HTML-Code notwendig -->`;
    }

    verify(iframe) {
        let error = "";
        let checkTemparature = iframe.contentWindow.checkTemparature;
        let results = [undefined, undefined, undefined, undefined];

        if (checkTemparature) {
            results[0] = checkTemparature(5);
            results[1] = checkTemparature(12);
            results[2] = checkTemparature(25);
            results[3] = checkTemparature(36);
        }

        if (!checkTemparature) {
            error = "Funktion <b><code>checkTemparature</code></b> existiert nicht.";
        } else if (results[0] !== "Kalt") {
            error = `Funktion <b><code>checkTemparature(5)</code></b> liefert das falsche Ergebnis <b><code>${results[0]}</code></b>.`;
        } else if (results[1] !== "Etwas frisch") {
            error = `Funktion <b><code>checkTemparature(12)</code></b> liefert das falsche Ergebnis <b><code>${results[1]}</code></b>.`;
        } else if (results[2] !== "Genau richtig") {
            error = `Funktion <b><code>checkTemparature(25)</code></b> liefert das falsche Ergebnis <b><code>${results[2]}</code></b>.`;
        } else if (results[3] !== "Heiß") {
            error = `Funktion <b><code>checkTemparature(36)</code></b> liefert das falsche Ergebnis <b><code>${results[3]}</code></b>.`;
        }

        return error;
    }
}

/**
 * Höhere Funktionen 1
 */
class SnippetFunktionen3 {
    get description() {
        return html`
            <p>
                Schreibe eine Funktion namens <b><code>hollywood()</code></b>, die als einzigen
                Parameter eine andere Funktion übergeben bekommt und diese aufruft. Die übergebene
                Funktion erwartet dabei keine Parameter.
            </p>
        `;
    }

    get html() {
        return html`<!-- Kein HTML-Code notwendig -->`;
    }

    verify(iframe) {
        let error = "";
        let hollywood = iframe.contentWindow.hollywood;
        let callbackCalled = false;

        if (hollywood) {
            hollywood(() => callbackCalled = true);
        }

        if (!hollywood) {
            error = "Funktion <b><code>hollywood</code></b> existiert nicht.";
        } else if (!callbackCalled) {
            error = "Funktion <b><code>hollywood</code></b> ruft die übergebenen Callback-Funktion nicht auf.";
        }

        return error;
    }
}

/**
 * Höhere Funktionen 2
 */
class SnippetFunktionen4 {
    get description() {
        return html`
                <p>
                    Schreibe zusätzlich eine Funktion namens <b><code>multiplyFactory()</code></b>,
                    die eine Zahl übergeben bekommt und eine neue Funktion als Ergebnis liefert.
                    Die neue Funktion soll ebenfalls eine Zahl als Parameter übergeben bekommen und
                    diese mit der an <b><code>multiplyFactory()</code></b> übergebenen Zahl
                    multiplizieren und zurück liefern.
                </p>
        `;
    }

    get html() {
        return html`<!-- Kein HTML-Code notwendig -->`;
    }

    verify(iframe) {
        let error = "";
        let multiplyFactory = iframe.contentWindow.multiplyFactory;
        let result = null;

        if (multiplyFactory) {
            let mul2 = multiplyFactory(2);
            result = mul2(42);
        }

        if (!multiplyFactory) {
            error = "Funktion <b><code>multiplyFactory</code></b> existiert nicht.";
        } else if (result !== 84) {
            error = `
                Funktion <b><code>multiplyFactory(2)</code></b> liefert nicht die gewünschte neue Funktion.
                Denn die neue Funktion liefert bei Aufruf mit der Zahl <b><code>42</code></b> das falsche
                Ergebnis <b><code>${result}</code></b>.
            `;
        }

        return error;
    }
}
