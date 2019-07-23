<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>👹 ComiX-Datenbank</title>
        <link rel="stylesheet" href="style.css"
    </head>
    <body>
        <header>
            <h1>👺 ComiX-Datenbank</h1>

            <form method="POST">
                <input type="hidden" name="aktion" value="anlegen" />

                <div>
                    <input type="text" name="serie" placeholder="Serie" value="${serie}" class="input" />
                    <input type="number" name="nummer" placeholder="Nummer" value="${nummer}" class="input" />
                    <input type="number" name="jahr" placeholder="Jahr" value="${jahr}" class="input" />
                </div>
                <div>
                    <input type="text" name="titel" placeholder="Titel" value="${titel}" class="input" />
                </div>
                <div>
                    <input type="text" name="zeichner" placeholder="Zeichner" value="${zeichner}" class="input" />
                    <input type="text" name="texter" placeholder="Texter" value="${texter}" class="input" />
                </div>
                <div>
                    <input type="submit" value="Comic anlegen" />
                </div>
            </form>

            <ul class="errors">
                <c:forEach items="${fehlermeldungen}" var="fehlermeldung">
                    <li>
                        ${fehlermeldung}
                    </li>
                </c:forEach>
            </ul>
        </header>

        <main>
            <c:choose>
                <c:when test="${empty serien}">
                    <h2>Es sind noch keine Einträge vorhanden</h2>
                </c:when>
                <c:otherwise>
                    <form method="POST">
                        <input type="hidden" name="aktion" value="loeschen" />

                        <c:forEach items="${serien}" var="serie">
                            <h2>${serie.serie}</h2>

                            <c:forEach items="${serie.comics}" var="comic">
                                <div class="comic">
                                    <div class="icon">🎴</div>
                                    <div class="description">
                                        <span class="title">
                                            <input type="checkbox" name="id" value="${comic.id}" />
                                            ${comic.serie}: ${comic.titel}
                                        </span>
                                        <br>
                                        Nummer ${comic.nummer}, ${comic.jahr}
                                        <br>
                                        Zeichnungen: ${comic.zeichner}, Text: ${comic.texter}
                                    </div>
                                </div>
                            </c:forEach>
                        </c:forEach>

                        <input type="submit" value="Ausgewählte Einträge löschen"/>
                    </form>
                </c:otherwise>
            </c:choose>
        </main>
    </body>
</html>
