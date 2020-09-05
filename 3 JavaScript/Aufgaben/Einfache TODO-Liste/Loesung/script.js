window.addEventListener("load", () => {
    let newButton = document.getElementById("button-new")
    let memoList = document.querySelector("body > main > ul");

    let insertMemo = text => {
        let liElement = document.createElement("li");
        memoList.appendChild(liElement);

        let memoTextElement = document.createElement("p");
        memoTextElement.textContent = text;
        liElement.appendChild(memoTextElement);

        let deleteElement = document.createElement("a");
        deleteElement.textContent = "Löschen";
        deleteElement.classList.add("delete");
        liElement.appendChild(deleteElement);

        deleteElement.addEventListener("click", () => {
            liElement.parentNode.removeChild(liElement);
        });
    };

    insertMemo("Klicke auf „Neue Notiz”, um eine neue Notiz anzulegen …");

    // Event Handler für Anlage einer Notiz
    newButton.addEventListener("click", () => {
        // Memotext vom Anwender abfragen
        let text = prompt("Geben Sie den Notiztext ein");
        if (text === null) return;

        // Neues Element in die HTML-Liste einfügen
        insertMemo(text);
    });
});
