package de.dhbw.webprog.todo;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpContext;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Diese Klasse implementiert eine einfache REST-Schnittstelle zum Anlagen,
 * Löschen und Abfragen von TODO-Einträgen.
 */
public class ApiHandler implements HttpHandler {

    private final Connection dbConnection;

    /**
     * Konstruktor, um eine Verbindung zur Datenbank herzustellen
     *
     * @throws java.lang.ClassNotFoundException
     * @throws java.sql.SQLException
     */
    public ApiHandler() throws ClassNotFoundException, SQLException {
        // Verbindung zur Datenbank herstellen
        System.out.println("Verbindung zur Datenbank wird hergestellt …");

        Class.forName("org.apache.derby.jdbc.EmbeddedDriver");
        this.dbConnection = DriverManager.getConnection("jdbc:derby:tododb;create=true");

        // Tabelle anlegen, falls noch nicht vorhanden
        Statement statement = this.dbConnection.createStatement();

        try {
            statement.executeUpdate(
                    "CREATE TABLE todo ("
                    + "    id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY,"
                    + "    text VARCHAR(255),"
                    + "    PRIMARY KEY(id)"
                    + ")"
            );
        } catch (SQLException e) {
            // Tabelle existiert schon
        }
    }

    /**
     * Verbindung zur Datenbank trennen
     *
     * @throws SQLException
     */
    public void close() throws SQLException {
        System.out.println("Verbindung zur Datenbank wird getrennt …");
        this.dbConnection.close();
    }

    /**
     * Startmethode für alle HTTP-Anfragen an den /api-Endpunkt
     *
     * @param httpExchange
     * @throws IOException
     */
    @Override
    public void handle(HttpExchange httpExchange) throws IOException {
        System.out.println("[API] " + httpExchange.getRequestMethod() + ": " + httpExchange.getRequestURI());

        Headers responseHeaders = httpExchange.getResponseHeaders();
        responseHeaders.set("content-type", "application/json");

        try {
            switch (httpExchange.getRequestMethod()) {
                case "GET":
                    this.doGet(httpExchange);
                    break;
                case "PUT":
                case "POST":
                    this.doPut(httpExchange);
                    break;
                case "DELETE":
                    this.doDelete(httpExchange);
                    break;
            }

            httpExchange.getRequestBody().close();

            OutputStream responseBody = httpExchange.getResponseBody();
            responseBody.flush();
            responseBody.close();

            httpExchange.close();
        } catch (Exception ex) {
            Logger.getLogger(ApiHandler.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Handler für HTTP GET-Anfragen: Liefert alle TODO-Einträge
     *
     * @param httpExchange
     * @throws IOException
     */
    private void doGet(HttpExchange httpExchange) throws IOException, SQLException {
        // Vorhandene Einträge aus der Datenbank lesen
        Statement statement = this.dbConnection.createStatement();
        List<TodoEntry> entries = new ArrayList<>();

        try (ResultSet result = statement.executeQuery("SELECT * FROM todo")) {
            while (result.next()) {
                TodoEntry entry = new TodoEntry();
                entry.id = result.getInt("id");
                entry.text = result.getString("text");
                entries.add(entry);
            }
        }

        // Einträge im JSON-Format an den Browser senden
        Gson gson = new GsonBuilder().create();
        String json = gson.toJson(entries);
        byte[] bytes = json.getBytes();
        
        httpExchange.sendResponseHeaders(200, bytes.length);
        OutputStream responseBody = httpExchange.getResponseBody();

        for (byte b : bytes) {
            responseBody.write(b);
        }

        System.out.println(json);
    }

    /**
     * Handler für HTTP PUT/POST-Anfragen: Speichert einen neuen Eintrag
     *
     * @param httpExchange
     * @throws IOException
     */
    private void doPut(HttpExchange httpExchange) throws IOException, SQLException {
        // JSON-String aus dem Request Body einlesen
        BufferedReader requestBody = new BufferedReader(new InputStreamReader(httpExchange.getRequestBody()));
        Gson gson = new GsonBuilder().create();
        TodoEntry entry = gson.fromJson(requestBody, TodoEntry.class);

        // Neuen Eintrag in der Datenbank ablegen
        String json;
        int responseCode;

        try {
            String text = entry.text.replaceAll("'", "''");

            PreparedStatement statement = this.dbConnection.prepareStatement(
                    "INSERT INTO todo (text) VALUES ('" + text + "')",
                    Statement.RETURN_GENERATED_KEYS
            );

            statement.executeUpdate();

            // Neue ID ermitteln
            ResultSet generatedKeys = statement.getGeneratedKeys();

            if (generatedKeys.next()) {
                entry.id = generatedKeys.getInt(1);
            }

            json = gson.toJson(entry);
            responseCode = 200;
        } catch (Exception ex) {
            // Fehler 500 bei einer Exception
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);

            JsonError error = new JsonError();
            error.message = ex.getMessage();

            json = gson.toJson(error);
            responseCode = 500;
        }

        // Bestätigung mit gespiechertem Eintrag an den Browser schicken
        byte[] bytes = json.getBytes();
        httpExchange.sendResponseHeaders(responseCode, bytes.length);
        OutputStream responseBody = httpExchange.getResponseBody();

        for (byte b : bytes) {
            responseBody.write(b);
        }

        System.out.println(json);
    }

    /**
     * Handler für HTTP DELETE-Anfragen: Löscht einen Eintrag
     *
     * @param httpExchange
     * @throws IOException
     */
    private void doDelete(HttpExchange httpExchange) throws IOException {
        // ID aus der URL ermitteln, z.B.: /api/42
        HttpContext httpContext = httpExchange.getHttpContext();
        String basePath = httpContext.getPath();
        String requestPath = httpExchange.getRequestURI().getPath();
        requestPath = requestPath.substring(basePath.length() + 1);

        // Eintrag löschen und Antwort an den Browser senden
        Gson gson = new GsonBuilder().create();
        int responseCode = 0;
        String json = "";

        try {
            int id = new Integer(requestPath);
            TodoEntry entry = new TodoEntry();

            if (requestPath.isEmpty()) {
                // Fehler 403, wenn keine ID mitgegeben wurde
                JsonError error = new JsonError();
                error.message = "In der URL fehlt die ID des zu löschenden Eintrags";

                json = gson.toJson(error);
                responseCode = 403;
            }

            if (responseCode == 0) {
                // Fehler 404, wenn der Eintrag nicht existiert
                Statement statement = this.dbConnection.createStatement();
                int amount = 0;

                try (ResultSet result = statement.executeQuery("SELECT * FROM todo WHERE id = " + id)) {
                    while (result.next()) {
                        amount++;
                        entry.id = result.getInt("id");
                        entry.text = result.getString("text");
                    }
                }

                if (amount == 0) {
                    JsonError error = new JsonError();
                    error.message = "Der gesuchte Eintrag wurde nicht gefunden";

                    json = gson.toJson(error);
                    responseCode = 404;
                }
            }

            if (responseCode == 0) {
                // Eintrag löschen und gelöschten Eintrag an den Browser senden
                Statement statement = this.dbConnection.createStatement();
                statement.executeUpdate("DELETE FROM todo WHERE id = " + id);

                json = gson.toJson(entry);
                responseCode = 200;
            }
        } catch (Exception ex) {
            // Fehler 500 bei einer Exception
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);

            JsonError error = new JsonError();
            error.message = ex.getMessage();

            json = gson.toJson(error);
            responseCode = 500;
        }

        byte[] bytes = json.getBytes();
        httpExchange.sendResponseHeaders(responseCode, bytes.length);
        OutputStream responseBody = httpExchange.getResponseBody();

        for (byte b : bytes) {
            responseBody.write(b);
        }

        System.out.println(json);
    }

}

/**
 * Hilfsklasse mit einem TODO-Eintrag
 */
class TodoEntry {

    int id = 0;
    String text = "";
}

/**
 * Fehlermeldung
 */
class JsonError {

    String message = "";
}
