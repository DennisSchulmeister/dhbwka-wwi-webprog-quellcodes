
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Dieses Beispiel leitet den Aufrufer immer an Google weiter.
 */
@WebServlet(urlPatterns = {"/redirect/"})
public class RedirectServlet extends HttpServlet {

    /**
     * Wir haben eine GET-Anfrage empfangen.
     */
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws IOException, ServletException {
        response.sendRedirect("https://www.google.de");
    }

}