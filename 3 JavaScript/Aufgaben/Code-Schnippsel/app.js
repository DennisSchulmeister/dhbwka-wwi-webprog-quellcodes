/**
 * Hauptklasse der Anwendung. Reagiert auf die Toolbar-Funktionen zum Blättern
 * und Ausführen der Aufgaben.
 */
class App {
    /**
     * Konstruktor.
     * @param {Array} snippets Array mit den Aufgaben-Klassen
     */
    constructor(snippets) {
        this.snippets = snippets;
        this.currentSnippet = null;
        this.currentSnippetIndex = -1;

        this.htmlTextarea = document.querySelector("#html-code");
        this.jsTextarea = document.querySelector("#javascript-code");
        this.description = document.querySelector("#description");
        this.result = document.querySelector("#result");
        this.cmdPrev = document.querySelector("#cmd-prev");
        this.cmdNext = document.querySelector("#cmd-next");
        this.cmdRun = document.querySelector("#cmd-run");
        this.iframeContainer = document.querySelector("#iframe-container");

        this.htmlEditor = null;
        this.jsEditor = null;
    }

    /**
     * Anwendung ausführen. Hier werden die CodeMirror-Editoren initialisiert
     * und die Event Handler registriert.
     */
    start() {
        // CodeMirror-Editoren initialisieren
        this.htmlEditor = CodeMirror.fromTextArea(this.htmlTextarea, {
            readOnly: true,
            lineNumbers: true,
            mode: "htmlmixed"
        });

        this.jsEditor = CodeMirror.fromTextArea(this.jsTextarea, {
            lineNumbers: true,
            mode: "javascript"
        });

        // Event Handler registrieren
        this.cmdPrev.addEventListener("click", event => {
            this.gotoSnippet(-1);
            event.preventDefault();
        });

        this.cmdNext.addEventListener("click", event => {
            this.gotoSnippet(1);
            event.preventDefault();
        });

        this.cmdRun.addEventListener("click", event => {
            this.runCode();
            event.preventDefault();
        });

        // Erste Aufgabe anzeigen
        this.currentSnippetIndex = -1;
        this.gotoSnippet(1);
    }

    /**
     * Nächste Aufgabe anzeigen.
     * @param {Number} offset Offset, der auf den aktuellen Index addiert wird
     */
    gotoSnippet(offset) {
        // Aufgaben-Klasse instantiieren
        this.currentSnippetIndex += offset;

        if (this.currentSnippetIndex < 0) {
            this.currentSnippetIndex = this.snippets.length - 1;
        } else if (this.currentSnippetIndex >= this.snippets.length) {
            this.currentSnippetIndex = 0;
        }

        this.currentSnippet = new this.snippets[this.currentSnippetIndex]();

        // Aufgabe anzeigen
        this.htmlEditor.doc.setValue(this.currentSnippet.html);
        this.jsEditor.doc.setValue("// Bitte hier Quellcode eingeben …\n");
        this.description.innerHTML = this.currentSnippet.description;

        this.result.innerHTML = "";
        this.result.classList.remove("success");
        this.result.classList.remove("error");

        this.iframeContainer.innerHTML = "";
    }

    /**
     * Quellcode ausführen und Ergebnis anzeigen.
     */
    async runCode() {
        // Code ausführen
        let scriptElement = document.createElement("script");
        let jsMessage = "";

        scriptElement.innerHTML = `
            try {
                ${this.jsEditor.doc.getValue()}
            } catch (ex) {
                console.log(ex);
                _exception_cb(ex);
            }
        `;

        this.iframeContainer.innerHTML = "<iframe></iframe>";

        let iframe = this.iframeContainer.querySelector("iframe");
        let exception = "";

        //iframe.src = "data:text/html;charset=utf-8," + escape(this.currentSnippet.html);
        iframe.src = URL.createObjectURL(new Blob([this.currentSnippet.html], {type: "text/html"}));
        iframe.contentWindow._exception_cb = ex => exception = ex;

        await new Promise((accept, reject) => {
            iframe.addEventListener("load", () => {
                accept();
            })
        });

        let iframeBody = iframe.contentDocument.querySelector("body");
        iframeBody.appendChild(scriptElement);

        // Ergebnis prüfen
        this.result.classList.remove("success");
        this.result.classList.remove("error");

        let message = this.currentSnippet.verify(iframe);

        if (!message && !exception) {
            this.result.classList.add("success");
            this.result.textContent = "Richtig!";
        } else {
            this.result.classList.add("error");
            this.result.innerHTML = `${message} <p>${exception.message || ""}</p>`;
        }
    }
}
