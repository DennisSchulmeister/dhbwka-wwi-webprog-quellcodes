package de.dhbw.comix.web;

import de.dhbw.comix.database.Comic;
import de.dhbw.comix.database.DatabaseFacade;
import de.dhbw.comix.database.Serie;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Requenst Handler für die Startseite mit folgenden Funktionen:
 *
 *   * Anzeige aller vorhandenen Comics * Anlage eines neuen Comics * Löschen
 * aller ausgewählten Comics
 */
@WebServlet(urlPatterns = {"/index.html"})
public class IndexServlet extends HttpServlet {

    @EJB
    DatabaseFacade database;

    /**
     * GET-Anfrage: Alle vorhandenen Comics anzeigen
     *
     * @param request
     * @param response
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        // Alle Comics auslesen und im Request Kontext ablegen
        List<Serie> serien = this.database.getAllComics();
        request.setAttribute("serien", serien);

        // Anfrage an unsere Template JSP weiterleiten
        request.getRequestDispatcher("/WEB-INF/index.jsp").forward(request, response);

        // Alte Fehlermeldungen aus dem Session Kontext löschen
        HttpSession session = request.getSession();
        session.removeAttribute("fehlermeldungen");
        session.removeAttribute("serie");
        session.removeAttribute("nummer");
        session.removeAttribute("jahr");
        session.removeAttribute("titel");
        session.removeAttribute("zeichner");
        session.removeAttribute("texter");
    }

    /**
     * POST-Anfrage: Neuen Comic anlegen oder Comics löschen
     *
     * @param request
     * @param response
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        // Fallunterscheidung, ob angelegt oder gelöscht werden soll
        String aktion = request.getParameter("aktion");

        switch (aktion) {
            case "anlegen":
                // Einen neuen Comic anlegen
                this.handleCreate(request, response);
                break;
            case "loeschen":
                // Ausgewählte Comics löschen
                this.handleDelete(request, response);
                break;
        }

        // Browser auffordern, die Seite neuzuladen
        response.sendRedirect(request.getRequestURI());
    }

    /**
     * Auszuführende Aktion: Neuen Comic anlegen
     *
     * @param request
     * @param response
     * @throws IOException
     * @throws ServletException
     */
    private void handleCreate(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        // Eingegebene Werte aus dem Formular lesen
        String serie = request.getParameter("serie");
        String nummer = request.getParameter("nummer");
        String jahr = request.getParameter("jahr");
        String titel = request.getParameter("titel");
        String zeichner = request.getParameter("zeichner");
        String texter = request.getParameter("texter");

        // Eingegebene Werte prüfen
        List<String> fehlermeldungen = new ArrayList<>();

        if (serie == null || serie.isEmpty()) {
            fehlermeldungen.add("Der Name der Serie fehlt.");
        }

        if (nummer == null || nummer.isEmpty()) {
            fehlermeldungen.add("Die Nummer des Comics fehlt.");
        }

        if (nummer != null && !nummer.matches("^[0-9]*$")) {
            fehlermeldungen.add("Die Nummer des Comics darf nur Zahlen beinhalten.");
        }

        if (jahr == null || jahr.isEmpty()) {
            fehlermeldungen.add("Das Erscheinungsjahr des Comics fehlt.");
        }

        if (jahr != null && !jahr.matches("^[0-9]*$")) {
            fehlermeldungen.add("Das Erscheinungsjahr des Comics darf nur Zahlen beinhalten.");
        }

        if (titel == null || titel.isEmpty()) {
            fehlermeldungen.add("Der Titel des Comics fehlt.");
        }

        if (zeichner == null || zeichner.isEmpty()) {
            fehlermeldungen.add("Der Zeichner des Comics fehlt.");
        }

        if (texter == null || texter.isEmpty()) {
            fehlermeldungen.add("Der Texter des Comics fehlt.");
        }

        // Prüfergebnisse zwischenspeichern
        HttpSession session = request.getSession();
        session.setAttribute("fehlermeldungen", fehlermeldungen);

        if (fehlermeldungen.isEmpty()) {
            // Neuen Datensatz anlegen
            this.database.createNewComic(serie, titel, new Integer(nummer), new Integer(jahr), zeichner, texter);
        } else {
            // Bei Fehlern alter Eingabewerte sichern
            session.setAttribute("serie", serie);
            session.setAttribute("nummer", nummer);
            session.setAttribute("jahr", jahr);
            session.setAttribute("titel", titel);
            session.setAttribute("zeichner", zeichner);
            session.setAttribute("texter", texter);
        }
    }

    /**
     * Auszuführende Aktion: Ausgewählte Comics löschen
     *
     * @param request
     * @param response
     * @throws IOException
     * @throws ServletException
     */
    private void handleDelete(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        // Ausgewählte Comics löschen
        List<String> fehlermeldungen = new ArrayList<>();
        
        for (String idString : request.getParameterValues("id")) {
            try {
                Long id = new Long(idString);
                Comic comic = this.database.getComicById(id);
                
                if (comic != null) {
                    this.database.delete(comic);
                }
            } catch (Exception ex) {
                fehlermeldungen.add(ex.getMessage());
            }
        }
        
        HttpSession session = request.getSession();
        session.setAttribute("fehlermeldungen", fehlermeldungen);
    }
}
