<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="template" tagdir="/WEB-INF/tags/templates" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<template:base>
    <jsp:attribute name="title">Neuen Film anlegen</jsp:attribute>

    <jsp:attribute name="body">
        <form method="POST">
            <table>
                <tr>
                    <td>
                        Name:
                    </td>
                    <td>
                        <input name="name" type="text" value="${name}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        Jahr:
                    </td>
                    <td>
                        <input name="releaseYear" type="year" value="${releaseYear}" />
                    </td>
                </tr>
            </table>

            <ul class="error">
                <c:forEach items="${errors}" var="error">
                    <li>${error}</li>
                    </c:forEach>
            </ul>

            <input type="submit" value="Film speichern" />
        </form>
    </jsp:attribute>
</template:base>