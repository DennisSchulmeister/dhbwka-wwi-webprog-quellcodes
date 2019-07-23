package de.dhbw.comix.web;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;

/**
 * Das haben wir in der Vorlesung nicht behandelt. :-) Filter sind so etwas
 * ähnliches wie Servlets. Genau wie Servlets können Sie HTTP-Anfragen abfangen.
 * Im Gegensatz zu Servlets generieren sie aber nur selten eine Antwort (obwohl
 * sie das technisch können).
 * 
 * Stattdessen werden sie den Servlets "vorgeschaltet", um sicherzustellen,
 * dass bestimmte Dinge immer gemacht werden, egal welches Servlet gerade
 * aufgerufen wird.
 * 
 * Dieser Filter sagt dem Webcontainer, dass die HTTP-Anfragen vom Browser
 * UTF-8 kodiert werden, da sonst Sonderzeichen in der Benutzereingabe falsch
 * interpretiert werden.
 */
@WebFilter(filterName = "UnicodeFilter", urlPatterns = {"/*"})
public class UnicodeFilter implements Filter {

    /**
     * Diese Methode filtert die HTTP-Anfrage.
     * @param request HTTP-Anfrage
     * @param response HTTP-Antwort
     * @param chain Kette mit Filtern und dem Zielservlet. Wir müssen hiervor
     *   die doFilter(request, reponse)-Methode aufrufen, um die HTTP-Anfrage
     *   an das nächste Glied der Kette weiterzureichen.
     *
     * @exception IOException wenn ein I/O-Fehler auftritt
     * @exception ServletException wenn ein Servlet-Fehler auftritt
     */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain)
            throws IOException, ServletException {

        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        
        chain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Brauchen wir hier nicht
    }

    @Override
    public void destroy() {
        // Brauchen wir hier nicht
    }
    
}
