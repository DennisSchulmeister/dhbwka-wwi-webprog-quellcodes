class SnippetVariablen {
    get description() {
        return html`
            <p>
                Lege eine globale Variable mit dem Namen <b><code>vorlesung</code></b>
                an und weise ihr den Wert <b><code>"Webprogrammierung"</code></b> zu.
            </p>
        `;
    }

    get html() {
        return html`<!-- Kein HTML-Code notwendig -->`;
    }

    verify(iframe) {
        let error = "";
        let vorlesung = iframe.contentWindow.vorlesung;

        if (!vorlesung) {
            error = "Variable <b><code>vorlesung</code></b> existiert nicht oder besitzt keinen Inhalt.";
        } else if (vorlesung !== "Webprogrammierung") {
            error = `Variable <b><code>vorlesung</code></b> enthält den falschen Wert <b><code>${vorlesung}</code></b>.`;
        }

        return error;
    }
}
