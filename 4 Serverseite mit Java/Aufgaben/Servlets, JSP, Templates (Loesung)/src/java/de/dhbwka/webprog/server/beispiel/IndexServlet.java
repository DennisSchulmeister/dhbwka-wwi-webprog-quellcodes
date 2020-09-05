package de.dhbwka.webprog.server.beispiel;

import java.io.IOException;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet für die Startseite
 */
@WebServlet(urlPatterns = {"/index.html"})
public class IndexServlet extends HttpServlet {

    @PersistenceContext
    EntityManager em;
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        // Alle vorhandenen Filme aus der Datenbank lesen
        List<Movie> movies = this.em.createQuery("SELECT m FROM Movie m ORDER BY m.releaseYear").getResultList();
        
        // Gefundene Objekte im Request Kontext ablegen
        request.setAttribute("movies", movies);
        
        // Anfrage an die index.jsp weitergeben
        request.getRequestDispatcher("/WEB-INF/index.jsp").forward(request, response);
    }
 
}
