/*
 * TwoStep Webservice (https://www.wpvs.de)
 * © 2023 Dennis Schulmeister-Zimolong <dennis@wpvs.de>
 * Creative Commons Namensnennung 4.0 International
 */
import express from "express";

// Server-Objekt erzeugen
const config = {
    port: parseInt(process.env.PORT) || 8888,
    host: process.env.HOST           || "localhost",
};

const app = express();
app.use(express.static("public"));

// Eingebaute Datenbasis
let data = {};

// Endpunkte zum Abfragen der Daten
app.get("/", (req, res) => {
    res.status(200);
    res.send("Hallo!");
});

// Server starten
app.listen(config.port, config.host, () => {
    console.log("==================");
    console.log("TwoStep Webservice");
    console.log("===================");
    console.log();
    console.log("Ausführung mit folgender Konfiguration:");
    console.log();
    console.log(config);
    console.log();
    console.log("Nutzen Sie die folgenden Umgebungsvariablen zum Anpassen der Konfiguration:");
    console.log();
    console.log("  » PORT: TCP-Port, auf dem der Webserver erreichbar ist");
    console.log("  » HOST: Hostname oder IP-Adresse, auf welcher der Webserver erreichbar ist");
    console.log();
});
