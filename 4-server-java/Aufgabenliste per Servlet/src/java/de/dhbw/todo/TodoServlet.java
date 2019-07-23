package de.dhbw.todo;

import java.io.IOException;
import java.io.PrintWriter;
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
        response.setContentType("text/html; charset=UTF-8");
        PrintWriter toBrowser = response.getWriter();

        HttpSession session = request.getSession();
        List<TodoEintrag> todos = (List<TodoEintrag>) session.getAttribute("todos");

        toBrowser.println("<!DOCTYPE html>");
        toBrowser.println("<html>");
        toBrowser.println("  <head>");
        toBrowser.println("    <meta charset='utf-8'>");
        toBrowser.println("    <link rel='stylesheet' href='style.css'>");
        toBrowser.println("    <title>Aufgabenliste</title>");
        toBrowser.println("  </head>");
        toBrowser.println("  <body>");
        toBrowser.println("    <div id='formular'>");
        toBrowser.println("      <h3>Neuen Eintrag anlegen</h3>");
        toBrowser.println("      <form method='POST'>");
        toBrowser.println("        <input type='text' name='titel' placeholder='Titel' />");
        toBrowser.println("        <br/>");
        toBrowser.println("        <textarea name='beschreibung' placeholder='Beschreibung'></textarea>");
        toBrowser.println("        <br/>");
        toBrowser.println("        <input type='submit' value='Hinzufügen'/>");
        toBrowser.println("      </form>");
        toBrowser.println("    </div>");
        toBrowser.println("    <div id='inhalt'>");

        if (todos == null || todos.isEmpty()) {
            toBrowser.println("<h1>Keine Einträge vorhanden</h1>");
        } else {
            for (TodoEintrag eintrag : todos) {
                toBrowser.println("<div class='todo'>");

                if (eintrag.titel.isEmpty()) {
                    toBrowser.println(eintrag.beschreibung);
                } else if (eintrag.beschreibung.isEmpty()) {
                    toBrowser.println("<b>" + eintrag.titel + "</b>");
                } else {
                    toBrowser.println("<b>" + eintrag.titel + ":</b> " + eintrag.beschreibung);
                }

                toBrowser.println("</div>");
            }
        }

        toBrowser.println("    </div>");
        toBrowser.println("  </body>");
        toBrowser.println("</html>");

        toBrowser.flush();
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
