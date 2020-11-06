const express = require("express");
const expressNunjucks = require("express-nunjucks");
const path = require("path");

const Database = require("./js/database");2

/* =============================================================================
 * SERVER-KONFIGURATION
 * =============================================================================*/

// Auslesen der Umgebungsvariablen zur Konfiguration des Servers
const config = {
    port: parseInt(process.env.PORT) || 8888,
    host: process.env.HOST           || "localhost",
};

// Protokollzeile für jede HTTP-Anfrage auf der Konsole ausgeben
const app = express();

app.use((request, response, next) => {
    console.log(new Date(), request.method, request.url, `HTTP ${request.httpVersion}`);
    next();
});

// Via POST gesendete Formulardaten auswerten
app.use(express.urlencoded({ extended: true }));

// Statische Dateien aus dem "static"-Verzeichnis direkt liefern
let staticDir = path.normalize(path.join(__dirname, "static"));
app.use(express.static(staticDir));

// Verzeichnis mit den HTML-Templates definieren
let templateDir = path.normalize(path.join(__dirname, "templates"));
app.set("views", templateDir);

let isDev = app.get("env") === "development";

expressNunjucks(app, {
    watch: isDev,
    noCache: isDev
});


/* =============================================================================
 * DEFINITION DER URL-ROUTEN UND BEARBEITUNG DER HTTP-ANFRAGEN
 * =============================================================================*/

// Zentrales Objekt zur Simulation einer Datenbank
let database = new Database();

// Endpunkt für die Startseite definieren
app.get("/", (request, response) => {
    response.render("page-list", {
        title: "Startseite",
        appmenu: [
            {
                text: "Übersicht",
                href: "/",
                class: "active",
            },{
                text: "Adresse hinzufügen",
                href: "/new/",
            }
        ],
        data: database.getData(),
    });
});

// Endpunkt zum Löschen einer Adresse
app.get("/delete/:index", (request, response) => {
    let index = request.params.index || -1;

    if (index >= 0) {
        database.deleteDataByIndex(index);
    }

    response.redirect("/");
});

// Endpunkte zum Anlegen und Bearbeiten eines neuen Eintrags
let handlePostRequest = (request, response) => {
    let index = request.params.index || -1;
    let create = index < 0;
    let errors = [];

    if (!request.body.first_name) {
        errors.push("Vorname fehlt");
    }

    if (!request.body.last_name) {
        errors.push("Nachname fehlt");
    }

    if (errors.length === 0) {
        let record = {
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            email: request.body.email,
            phone: request.body.phone,
        }

        if (create) {
            database.appendData(record);
        } else {
            database.updateDataByIndex(index, record);
        }
    }

    return errors;
};

app.get("/new/", (request, response) => {
    response.render("page-edit", {
        title: "Neuer Eintrag",
        appmenu: [
            {
                text: "Übersicht",
                href: "/",
            },{
                text: "Adresse hinzufügen",
                href: "/new/",
                class: "active",
            }
        ],
        record: {
            first_name: "",
            last_name: "",
            phone: "",
            email: "",
        },
    });
});

app.post("/new/", (request, response) => {
    let errors = handlePostRequest(request, response);

    if (errors.length === 0) {
        response.redirect("/");
    } else {
        /* TODO: Im Falle von Fehlern darf der/die Anwender*in nicht auf die
         * Startseite weitergeleitet werden. Stattdessen muss dieselbe Seite
         * zum Anlegen eines Datensatzes mit response.render(…) ähnlich wie bei
         * einer GET-Anfrage erneut ausgegeben werden.
         *
         * Zusätzlich zu den Feldern title, appmenu und record muss dem Template
         * aber noch ein Feld namens errors mit den Fehlermeldungen übergeben
         * werden.
         *
         * Außerden müssen im Feld record die zuvor eingegebenen Werte der
         * Formularfelder an das Template übergeben werden, damit diese nicht
         * verloren gehen.
         */
    }
});

app.get("/edit/:index", (request, response) => {
    response.render("page-edit", {
        title: "Eintrag bearbeiten",
        appmenu: [
            {
                text: "Übersicht",
                href: "/",
            },{
                text: "Adresse bearbeiten",
                href: request.url,
                class: "active",
            }
        ],
        record: database.getDataByIndex(request.params.index),
    });
});

app.post("/edit/:index", (request, response) => {
    let errors = handlePostRequest(request, response);

    if (errors.length === 0) {
        response.redirect("/");
    } else {
        /* TODO: Im Falle von Fehlern darf der/die Anwender*in nicht auf die
         * Startseite weitergeleitet werden. Stattdessen muss dieselbe Seite
         * zum Bearbeiten eines Datensatzes mit response.render(…) ähnlich wie
         * bei einer GET-Anfrage erneut ausgegeben werden.
         *
         * Zusätzlich zu den Feldern title, appmenu und record muss dem Template
         * aber noch ein Feld namens errors mit den Fehlermeldungen übergeben
         * werden.
         *
         * Außerden müssen im Feld record die zuvor eingegebenen Werte der
         * Formularfelder an das Template übergeben werden, damit diese nicht
         * verloren gehen.
         */
    }
});

/* =============================================================================
 * SERVER STARTEN
 * =============================================================================*/
app.listen(config.port, config.host, () => {
    console.log("=================");
    console.log("Adressbuch-Server");
    console.log("=================");
    console.log();
    console.log("Ausführung mit folgender Konfiguration:");
    console.log();
    console.log(config);
    console.log();
    console.log("Nutzen Sie die folgenden Umgebungsvariablen zum Anpassen der Konfiguration:");
    console.log();
    console.log("  » PORT: TCP-Port, auf dem der Webserver erreichbar ist");
    console.log("  » HOST: Hostname oder IP-Addresse, auf welcher der Webserver erreichbar ist");
    console.log();
});
