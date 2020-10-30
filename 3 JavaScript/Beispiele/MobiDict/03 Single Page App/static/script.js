/*
 * mobidict (https://www.wpvs.de)
 * © 2020 Dennis Schulmeister-Zimolong <dennis@wpvs.de>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 */
"use strict";

window.addEventListener("load", () => {
    // Event Handler für die Links im Menü definieren
    let menuHome = document.querySelector("#menu-home");
    let menuAbout = document.querySelector("#menu-about");

    menuHome.addEventListener("click", event => {
        document.querySelectorAll("main").forEach(e => e.classList.add("hidden"));
        document.querySelector("#page-search").classList.remove("hidden");
        event.preventDefault();
    });

    menuAbout.addEventListener("click", event => {
        document.querySelectorAll("main").forEach(e => e.classList.add("hidden"));
        document.querySelector("#page-about").classList.remove("hidden");
        event.preventDefault();
    });

    // Event Handler zum Abrufen der Ergebnisse registrieren
    let inputField = document.querySelector("#page-search .search-query");
    let searchButton = document.querySelector("#page-search .search-button");

    inputField.addEventListener("keyup", event => {
        if (event.key == "Enter") {
            searchAndShowResults();
        }
    });

    searchButton.addEventListener("click", event => {
        searchAndShowResults();
    });

    async function searchAndShowResults() {
        let query = inputField.value;
        let result = await fetch(`http://localhost:8888/api/query?q=${encodeURI(query)}`);
        let json = await result.json();

        if (json.error) {
            document.querySelector("#page-search .error").textContent = json.error;
            return;
        }

        let resultElement = document.querySelector("#page-search .result");
        resultElement.innerHTML = "";

        json.result.forEach(line => {
            let splitted = line.split("::");
            let word = splitted[0] || "";
            let translation = splitted[1] || "";

            resultElement.innerHTML += `
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
});
