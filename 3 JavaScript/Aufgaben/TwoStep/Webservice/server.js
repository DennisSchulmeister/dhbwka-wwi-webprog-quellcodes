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
let data = {
    composers: [
        {
            slug: "scott-joplin",
            name: "Scott Joplin",
            born: 1867,
            died: 1917,
            songs: [
                { title: "The Entertainer", year: 1902 },
                { title: "Maple Leaf Rag",  year: 1899 },
            ],
        }, {
            slug: "james-scott",
            name: "James Scott",
            born: 1886,
            died: 1938,
            songs: [
                { title: "Grace and Beauty", year: 1909 },
            ],
        }, {
            slug: "luckey-roberts",
            name: "Luckey Roberts",
            born: 1887,
            died: 1968,
            songs: [
                { title: "Pork and Beans",    year: 1913 },
                { title: "The Music Box Rag", year: 1914 },
            ],
        },
    ],
};

// Endpunkte zum Abfragen der Daten
app.get("/", (req, res) => {
    res.redirect("/api/composer");
});

app.get("/api/composer", (req, res) => {
    res.status(200);
    res.json(data.composers);
});

app.get("/api/composer/:slug", (req, res) => {
    let composer = data.composers.find(c => c.slug = req.params.slug);

    if (!composer) {
        res.status(404);
        res.json({error: "Nicht gefunden!"});
    } else {
        res.status(200);
        res.json(composer);
    }
});

app.get("/api/composer/:slug/songs", (req, res) => {
    let composer = data.composers.find(c => c.slug = req.params.slug);

    if (!composer) {
        res.status(404);
        res.json({error: "Nicht gefunden!"});
    } else {
        res.status(200);
        res.json(composer.songs);
    }
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
