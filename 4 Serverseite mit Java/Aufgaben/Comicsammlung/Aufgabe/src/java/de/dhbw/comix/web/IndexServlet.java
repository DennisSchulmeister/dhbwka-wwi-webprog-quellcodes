package de.dhbw.comix.web;

import de.dhbw.comix.database.DatabaseFacade;
import java.io.IOException;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Requenst Handler für die Startseite mit folgenden Funktionen:
 * 
 *   * Anzeige aller vorhandenen Comics
 *   * Anlage eines neuen Comics
 *   * Löschen aller ausgewählten Comics
 */
@WebServlet(urlPatterns={"/index.html"})
public class IndexServlet extends HttpServlet {
    
    @EJB DatabaseFacade database;
    
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
    }
}
