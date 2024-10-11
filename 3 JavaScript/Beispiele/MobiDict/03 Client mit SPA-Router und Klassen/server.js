/*
 * mobidict (https://www.wpvs.de)
 * © 2020 Dennis Schulmeister-Zimolong <dennis@wpvs.de>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 */
const egrep = require('@apexearth/egrep')
const express = require("express");
const path = require("path");


/* =============================================================================
 * SERVER-KONFIGURATION
 * =============================================================================*/

// Auslesen der Umgebungsvariablen zur Konfiguration des Servers
const config = {
    dict_file: process.env.DICT_FILE      || path.normalize(path.join(__dirname, "..", "beolingus")),
    port:      parseInt(process.env.PORT) || 8888,
    host:      process.env.HOST           || "localhost",
};

// Protokollzeile für jede HTTP-Anfrage auf der Konsole ausgeben
const app = express();

app.use((request, response, next) => {
    console.log(new Date(), request.method, request.url, `HTTP ${request.httpVersion}`);
    next();
});

// Statische Dateien aus dem "static"-Verzeichnis direkt liefern
let staticDir = path.normalize(path.join(__dirname, "static"));
app.use(express.static(staticDir));


/* =============================================================================
 * DEFINITION DER URL-ROUTEN UND BEARBEITUNG DER HTTP-ANFRAGEN
 * =============================================================================*/

// Endpunkt zum Abfragen des Wörterbuchs definieren
app.get("/api/query", (request, response) => {
    let query  = request.query.q || "";

    if (!query) {
        response.status(400);
        response.json({error: "query-missing", message: "Query parameter q missing or empty."});
        return;
    }

    egrep({
        pattern: query,
        files: [config.dict_file],
        recursive: false,
        objectMode: false,
    }, (error, result) => {
        if (error) {
            response.status(500);
            response.json({error: "grep", message: `Es ist ein Fehler aufgetreten. Die Suche konnte nicht ausgeführt werden.`});
        } else {
            response.type("application/json");

            response.json({
                query: query,
                result: result.split("\n"),
            });
        }
    });
});


/* =============================================================================
 * SERVER STARTEN
 * =============================================================================*/
app.listen(config.port, config.host, () => {
    console.log("=======================");
    console.log("mobidict node.js server");
    console.log("=======================");
    console.log();
    console.log("Ausführung mit folgender Konfiguration:");
    console.log();
    console.log(config);
    console.log();
    console.log("Nutzen Sie die folgenden Umgebungsvariablen zum Anpassen der Konfiguration:");
    console.log();
    console.log("  » DICT_FILE:  Pfad und Dateiname der Wörterbuchdatei (Plain-Text-Format)");
    console.log("  » PORT:       TCP-Port, auf dem der Webserver erreichbar ist");
    console.log("  » HOST:       Hostname oder IP-Addresse, auf welcher der Webserver erreichbar ist");
    console.log();
});
