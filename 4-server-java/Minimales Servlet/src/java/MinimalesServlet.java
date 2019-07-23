import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Dies ist ein Minimalbeispiel für ein Servlet, das auf HTTP-Anfragen reagiert.
 */
@WebServlet(
    urlPatterns = {
        "/",
        "/hallo/*"
    }
)
public class MinimalesServlet extends HttpServlet {
    
    /**
     * Diese Methode reagiert auf GET-Anfragen.
     */
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws IOException, ServletException {
        // Datenstrom für Ausgabe zum Client
        response.setContentType("text/html");
        PrintWriter toClient = response.getWriter();

        // HTML-Code erzeugen und ausgeben
        toClient.println("<html>");
        toClient.println("  <body>");
        toClient.println("    <h1>Hallo Servlet!</h1>");
        toClient.println("  </body>");
        toClient.println("</html>");
        
        toClient.flush();
    }
    
}
