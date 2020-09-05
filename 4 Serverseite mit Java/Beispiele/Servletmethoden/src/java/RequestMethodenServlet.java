
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Dieses Beispiel zeigt den Aufruf einiger wichtiger Methoden
 * von HttpServletRequest.
 */
@WebServlet(urlPatterns = {"/request/"})
public class RequestMethodenServlet extends HttpServlet {

    /**
     * Wir haben eine GET-Anfrage empfangen.
     */
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws IOException, ServletException {
        // Informationen aus der HTTP-Anfrage auslesen
        String uri = request.getRequestURI();
        String query = request.getQueryString();
        String vornameParameter = request.getParameter("vorname");
        String userAgent = request.getHeader("user-agent");

        // Antwort senden
        response.setContentType("text/plain");
        PrintWriter toClient = response.getWriter();

        toClient.println("Folgende Anfrage hast du geschickt");
        toClient.println("==================================");
        toClient.println("");
        toClient.println("URL: " + uri);
        toClient.println("Query String: " + query);
        toClient.println("Parameter vorname: " + vornameParameter);
        toClient.println("User Agent: " + userAgent);

        toClient.flush();
    }

}