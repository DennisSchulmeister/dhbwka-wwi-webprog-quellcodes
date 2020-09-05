window.addEventListener("load", () => {
    /**
     * Anzeige eines einzelnen TODO-Eintrags
     * @param {type} entry
     * @returns {undefined}
     */
    let displayEntry = (entry) => {
        if (entry.message) {
            alert(entry.message);
            return;
        }
        
        let ulElement = document.getElementById("entries");
        let liElement = document.createElement("li");
        ulElement.appendChild(liElement);

        let divElement = document.createElement("span");
        divElement.classList.add("delete");
        divElement.textContent = "🗑️";
        divElement.dataset.id = entry.id;
        liElement.appendChild(divElement);

        divElement.addEventListener("click", event => {
            // Löschbefehl an den Server schicken
            let ajax = new XMLHttpRequest();
            ajax.open("DELETE", `/api/${event.target.dataset.id}`);
            ajax.responseType = "json";
            ajax.addEventListener("load", () => {
                if (ajax.status === 200) {
                    // Eintrag aus der Ansicht entfernen
                    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
                } else {
                    alert(ajax.response.message);
                }
            });
            
            ajax.send();
        });

        divElement = document.createElement("div");
        divElement.textContent = entry.text;
        liElement.appendChild(divElement);
    };

    /**
     * Anzeige einer ganzen Liste von TODO-Einträgen
     * @param {type} entries
     * @returns {undefined}
     */
    let displayEntries = (entries) => {
        entries.forEach(entry => displayEntry(entry));
    };

    /**
     * Alle Einträge vom Server abrufen und anzeigen
     * @returns {undefined}
     */
    let fetchAndDisplayAllEntries = () => {
        let ajax = new XMLHttpRequest();
        ajax.open("GET", "/api");
        ajax.responseType = "json";
        ajax.addEventListener("load", () => displayEntries(ajax.response));
        ajax.send();
    };

    fetchAndDisplayAllEntries();

    /**
     * Neuen Eintrag anlegen und anzeigen
     * @returns {undefined}
     */
    let saveNewEntry = () => {
        // Text auslesen
        let todoInput = document.getElementById("todo-input");

        if (todoInput.value === "") {
            alert("Willst du wirklich einen Eintrag ohne Text erzeugen? :-)");
            return;
        }

        // Neuen Eintrag an den Server schicken und dann den zurückgelieferten
        // Eintrag anzeigen
        let ajax = new XMLHttpRequest();
        ajax.open("PUT", "/api");
        ajax.responseType = "json";
        ajax.addEventListener("load", () => {
            todoInput.value = "";
            displayEntry(ajax.response)
        });

        ajax.send(JSON.stringify({
            text: todoInput.value,
        }));
    };

    let createButton = document.getElementById("todo-anlegen-button");
    createButton.addEventListener("click", () => saveNewEntry());
});