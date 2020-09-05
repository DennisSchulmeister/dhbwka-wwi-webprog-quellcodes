window.addEventListener("load", () => {
    let newButton = document.getElementById("button-new")
    let memoList = document.querySelector("body > main > ul");

    let insertMemo = text => {
        // TODO: Neue Notiz anzeigen. Die Notiz soll, wie im HTML erklärt,
        // einen "Löschen"-Link haben, über den sie gelöscht werden kann.
    };

    // TODO: Automatisch eine Notiz mit folgendem Text anlegen: "Klicke auf „Neue
    // Notiz”, um eine neue Notiz anzulegen …"

    // Event Handler für Anlage einer Notiz
    newButton.addEventListener("click", () => {
        // Memotext vom Anwender abfragen
        let text = prompt("Geben Sie den Notiztext ein");
        if (text === null) return;

        // Neues Element in die HTML-Liste einfügen
        insertMemo(text);
    });

});
