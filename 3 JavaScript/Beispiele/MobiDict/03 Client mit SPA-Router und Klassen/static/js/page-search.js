"use strict";

/**
 * Klasse PageSearch: Zeigt die Startseite mit der Suche und Ergebnislsite.
 */
class PageSearch {
    /**
     * Konstruktor.
     * @param {App} app Zentrale App-Instanz
     */
    constructor(app) {
        this._app = app;

        this.inputField = document.querySelector("#page-search .search-query");
        this.searchButton = document.querySelector("#page-search .search-button");
        this.resultElement = document.querySelector("#page-search .result");

        this._installEventHandlers();
    }

    /**
     * Vom Router aufgerufene Methode, um die Seite anzuzeigen.
     * @param {Array} matches Matched regex groups in the url
     */
    async show(matches) {
        let query = matches[1] ? decodeURI(matches[1]) : null;
        let title = query ? `Suche nach ${query}` : "Startseite";

        this.resultElement.innerHTML = "";

        if (query) {
            let result = await fetch(`http://localhost:8888/api/query?q=${encodeURI(query)}`);
            let json = await result.json();

            json.result.forEach(line => {
                let splitted = line.split("::");
                let word = splitted[0] || "";
                let translation = splitted[1] || "";

                this.resultElement.innerHTML += `
                    <tr>
                        <td class="word">
                            ${word}
                        </td>
                        <td class="translation">
                            ${translation}
                        </td>
                    </tr>
                `;
            });
        }

        this._app.setPageTitle(title);
        this._app.setPageContent("#page-search");
    }

    /**
     * Event Handler für das Suchformular einrichten.
     */
    _installEventHandlers() {
        this.inputField.addEventListener("keyup", event => {
            if (event.key == "Enter") {
                this._gotoSearchResult(this.inputField.value);
            }
        });

        this.searchButton.addEventListener("click", event => {
            this._gotoSearchResult(this.inputField.value);
        });
    }

    /**
     * Den Router auffordern, eine Seite mit dem Suchergebniss zu einer
     * Suche zu öffnen.
     */
    _gotoSearchResult(query) {
        if (!query) {
            location.hash = "/";
        } else {
            location.hash = `#/query/${query}`;
        }
    }
}
