package de.dhbwka.webprog.server.beispiel;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.transaction.UserTransaction;

/**
 * Servlet zum Anlegen eines neuen Datensatzes
 */
@WebServlet(urlPatterns = {"/create"})
public class CreateServlet extends HttpServlet {

    @PersistenceContext
    EntityManager em;

    @Resource
    UserTransaction tx;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Anfrage an die create.jsp weiterleiten
        request.getRequestDispatcher("/WEB-INF/create.jsp").forward(request, response);

        // Alte Einträge in der Session löschen
        HttpSession session = request.getSession();

        session.removeAttribute("name");
        session.removeAttribute("releaseYear");
        session.removeAttribute("errors");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Eingegebene Werte auslesen
        List<String> errors = new ArrayList<>();

        String name = request.getParameter("name");
        String releaseYear = request.getParameter("releaseYear");

        if (name == null || name.isEmpty()) {
            errors.add("Gib erst einen Namen ein");
        }

        if (releaseYear == null || releaseYear.isEmpty()) {
            errors.add("Gib erst eine Jahreszahl ein");
        }

        // Versuchen zu speichern
        Movie movie = null;

        if (errors.isEmpty()) {
            try {
                movie = new Movie(name, new Integer(releaseYear));
            } catch (NumberFormatException ex) {
                errors.add("Die Jahreszahl darf nur Zahlen beinhalten");
            }
        }

        if (movie != null) {
            try {
                tx.begin();
                em.merge(movie);
                tx.commit();
            } catch (Exception ex) {
                errors.add(ex.getMessage());
            }
        }

        // Weiter zur nächsten Seite
        if (!errors.isEmpty() || movie == null) {
            // Bei Fehlern auf der aktuellen Seite bleiben
            HttpSession session = request.getSession();
            session.setAttribute("name", name);
            session.setAttribute("releaseYear", releaseYear);
            session.setAttribute("errors", errors);

            response.sendRedirect(request.getRequestURI());
        } else {
            response.sendRedirect(request.getContextPath());
        }
    }

}
