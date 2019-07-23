<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Aufgabenliste</title>
        <link rel="stylesheet" href="style.css" />
    </head>
    <body>
        <!-- Eingabeformular -->
        <div id="formular">
            <h3>Neuen Eintrag anlegen</h3>
            
            <form method="POST">
                <input type="text" name="titel" placeholder="Titel" />
                <br />
                <textarea name="beschreibung" placeholder="Beschreibung"></textarea>
                <br />
                <input type="submit" value="Abschicken" />
            </form>
        </div>
        
        <!-- Bereits vorhandene TODO-Einträge -->
        <div id="inhalt">
            <c:choose>
            <c:when test="${empty todos}">
                <h1>Keine Einträge vorhanden</h1>
            </c:when>
            <c:otherwise>
                <c:forEach items="${todos}" var="todo">
                    <div class="todo">
                        <c:choose>
                            <c:when test="${empty todo.titel}">
                                ${todo.beschreibung}
                            </c:when>
                            <c:when test="${empty todo.beschreibung}">
                                ${todo.titel}
                            </c:when>
                            <c:otherwise>
                                <b>${todo.titel}:</b> ${todo.beschreibung}
                            </c:otherwise>
                        </c:choose>
                    </div>
                </c:forEach>
            </c:otherwise>
        </c:choose>
        </div>
    </body>
</html>
