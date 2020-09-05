
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Dieses Servlet zeigt, wie die Erzeugung des HTML-Codes an eine Java Server
 * Page ausgelagert werden kann.
 */
@WebServlet(urlPatterns = {"/index.html"})
public class HalloServlet extends HttpServlet {
    
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws IOException, ServletException {        
        // Zwischenspeichern eines Wertes, den wir in der JSP anzeigen wollen
        // Die letzte Zeile ist die wichtige Zeile hier
        DateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");
        Date date = new Date();
        String tagesdatum = dateFormat.format(date);
        
        request.setAttribute("tagesdatum", tagesdatum);
        
        // Anfrage an eine JSP weiterleiten, um damit den HTML-Code
        // der Seite zu generieren
        RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/hallo.jsp");
        dispatcher.forward(request, response);
        
        // Werte im Session Kontext entfernen, damit wir beim nächsten mal
        // wieder von vorne anfangen
        HttpSession session = request.getSession();
        session.removeAttribute("vorname");
        session.removeAttribute("nachname");
        session.removeAttribute("fehlermeldungen");
        session.removeAttribute("ergebnisAnzeigen");
    }
    
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
    throws IOException, ServletException {
        // Eingegebene Werte auslesen
        List<String> fehlermeldungen = new ArrayList<>();
        
        String vorname = request.getParameter("vorname");
        String nachname = request.getParameter("nachname");
        
        if (vorname == null || vorname.isEmpty()) {
            fehlermeldungen.add("Gib erst einen Vornamen ein");
        }
        
        if (nachname == null || nachname.isEmpty()) {
            fehlermeldungen.add("Gib erst einen Nachnamen ein");
        }
        
        // Werte im Session Kontext ablegen
        HttpSession session = request.getSession();
        session.setAttribute("vorname", vorname);
        session.setAttribute("nachname", nachname);
        session.setAttribute("fehlermeldungen", fehlermeldungen);
        session.setAttribute("ergebnisAnzeigen", fehlermeldungen.isEmpty());
        
        // Und die Seite nochmal laden lassen
        response.sendRedirect(request.getRequestURI());
    }
    
}
