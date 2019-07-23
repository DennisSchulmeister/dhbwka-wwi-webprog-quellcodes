package de.dhbw.webprog.todo;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * Diese Klasse sendet den Inhalt statischer Dateien (HTML, CSS, JavaScript, …)
 * an den Browsers.
 */
public class StaticFileHandler implements HttpHandler {

    @Override
    public void handle(HttpExchange httpExchange) throws IOException {
        System.out.println("[STATIC FILE] " + httpExchange.getRequestMethod() + ": " + httpExchange.getRequestURI());
        
        InputStream requestBody = httpExchange.getRequestBody();
        Headers responseHeaders = httpExchange.getResponseHeaders();
        
        // Angefragten Datei öffnen
        int responseCode = 200;
        
        String filename = "/static" + httpExchange.getRequestURI().getPath();
        if (filename.equals("/static/")) filename = "/static/index.html";
        
        InputStream fileContent = this.getClass().getResourceAsStream(filename);
        
        if (fileContent == null) {
            responseCode = 404;
            filename = "/static/404.html";
            fileContent = this.getClass().getResourceAsStream(filename);
        }
        
        // MIME-Typ ermitteln und senden
        if (filename.endsWith(".htm") || filename.endsWith(".html")) {
            responseHeaders.set("content-type", "text/html");
        } else if (filename.endsWith(".css")) {
            responseHeaders.set("content-type", "text/css");
        } else if (filename.endsWith(".js")) {
            responseHeaders.set("content-type", "application/javascript");
        } else if (filename.endsWith(".jpg")) {
            responseHeaders.set("content-type", "image/jpeg");
        } else if (filename.endsWith(".png")) {
            responseHeaders.set("content-type", "image/png");
        } else if (filename.endsWith(".gif")) {
            responseHeaders.set("content-type", "image/gif");
        } else {
            responseHeaders.set("content-type", "binary/octet-stream");
        }
        
        // Statuscode und Größe der Antwort setzen
        int filesize = 0;
        
        while (fileContent.read() > -1) {
            filesize++;
        }
        
        httpExchange.sendResponseHeaders(responseCode, filesize);
        fileContent.close();
        
        // Inhalt der Datei senden
        fileContent = this.getClass().getResourceAsStream(filename);
        OutputStream responseBody = httpExchange.getResponseBody();
        int b;
        filesize = 0;
        
        while ((b = fileContent.read()) > -1) {
            filesize++;
            responseBody.write(b);
        }

        responseBody.flush();
        httpExchange.close();
    }

}
