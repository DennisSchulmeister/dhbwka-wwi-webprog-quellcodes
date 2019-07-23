package de.dhbw.webprog.todo;

import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Hauptklasse unserer Serveranwendung. Hier wird der eingebettete Webserver
 * initialisierung und gestartet.
 */
public class Main {

    /**
     * An dieser Methode erkennt man, dass es sich um ein ganz normales
     * Javaprogramm handelt. Absolut nichts besonderes.
     *
     * @param args Kommandozeilenparameter
     */
    public static void main(String[] args) throws Exception {
        // Portnummer des Servers ermitteln
        int port = 4242;

        if (args.length > 1) {
            port = new Integer(args[1]);
        }

        // Webserver initialisieren und starten
        System.out.println("Der Webserver startet …");

        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        ApiHandler apiHandler = new ApiHandler();

        server.createContext("/", new StaticFileHandler());
        server.createContext("/api", apiHandler);

        server.setExecutor(null);
        server.start();

        Runtime.getRuntime().addShutdownHook(new Thread() {
            @Override
            public void run() {
                try {
                    apiHandler.close();
                } catch (SQLException ex) {
                    Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        });

        System.out.println("Bereit!");
    }
}
