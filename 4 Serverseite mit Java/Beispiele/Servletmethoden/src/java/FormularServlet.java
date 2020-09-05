
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


/**
 * Dieses Servlet zeigt, wie du Formulareingaben richtig behandelt werden.
 * Es zeigt, dass bei einer GET-Anfrage das Formular geschickt wird und 
 * dieses seine Daten per POST an den Server schickt. Bei einer POST-Anfrage
 * müssen daher die Formulardaten ausgelesen und verarbeitet werden, woraufhin
 * der Browser durch einen Redirect zum Neuladen der Seite gezwungen wird.
 */
@WebServlet(urlPatterns = {"/formular/"})
public class FormularServlet extends HttpServlet{
    
    /**
     * GET-Anfrage: Liefert eine HTML-Seite mit einem Formular
     */
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws IOException, ServletException {
        // Anfang der HTML-Seite
        response.setContentType("text/html");
        response.setCharacterEncoding("utf-8");
        
        PrintWriter toClient = response.getWriter();
        
        toClient.println("<!DOCTYPE html>");
        toClient.println("<html>");
        toClient.println("    <head>");
        toClient.println("        <meta charset='utf-8' />");
        toClient.println("        <title>Hallo-Welt-Formular</title>");
        toClient.println("    </head>");
        toClient.println("    <body>");
        
        // Hier nun das eigentliche Formular
        toClient.println("        <form method='POST'>");
        toClient.println("            Wie heißt du?");
        toClient.println("            <input name='vorname' type='text' />");
        toClient.println("            <input type='submit' value='Abschicken' />");
        toClient.println("        </form>");
        
        // Zuletzt eingegebener Vorname, falls vorhanden
        // Der Wert wird in der doPost()-Methode im Session Kontext abgelegt
        HttpSession session = request.getSession();
        String vorname = (String) session.getAttribute("vorname");
        
        if (vorname != null) {
            toClient.println("        <p>");
            toClient.println("            Hallo, " + vorname + "!");
            toClient.println("        </p>");
        }
        
        // Abschluss der Seite
        toClient.println("    </body>");
        toClient.println("</html>");
        
        toClient.flush();
    }
    
    /**
     * POST-Anfrage: Verarbeitet die Formulareingaben und zwingt den Browser
     * danach, die Seite neuzuladen.
     */
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
    throws IOException, ServletException {
        // Eingebenen Vornamen auslesen
        String vorname = request.getParameter("vorname");

        // Vornamen im Session Kontext speichern
        HttpSession session = request.getSession();
        session.setAttribute("vorname", vorname);
        
        // Browser zwingen, die Seite mit einem GET neuzuladen
        response.sendRedirect(request.getRequestURI());
    }
    
}
