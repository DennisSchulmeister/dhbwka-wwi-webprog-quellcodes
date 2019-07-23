package de.dhbw.todo;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servletklasse für eine einfache TODO-Liste. Dies demonstriert den praktischen
 * Einsatz des Post/Redirect/Get-Patterns für Formulareingaben.
 */
@WebServlet(name = "TodoServlet", urlPatterns = {"/index.html"})
public class TodoServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // HTML-Seite generieren
        request.getRequestDispatcher("/WEB-INF/todo.jsp").forward(request, response);
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Neuen Eintrag im Session Context speichern
        request.setCharacterEncoding("utf-8");
        
        String titel = request.getParameter("titel");
        if (titel == null) {
            titel = "";
        }
        
        String beschreibung = request.getParameter("beschreibung");
        if (beschreibung == null) {
            beschreibung = "";
        }

        if (!titel.isEmpty() || !beschreibung.isEmpty()) {
            HttpSession session = request.getSession();
            List<TodoEintrag> todos = (List<TodoEintrag>) session.getAttribute("todos");

            if (todos == null) {
                todos = new LinkedList<>();
            }

            TodoEintrag neuerEintrag = new TodoEintrag();
            neuerEintrag.titel = titel;
            neuerEintrag.beschreibung = beschreibung;

            todos.add(neuerEintrag);
            session.setAttribute("todos", todos);
        }

        // Browser die Seite neuladen lassen (Post/Redirect/Get-Pattern)
        response.sendRedirect(request.getRequestURI());
    }

}
