<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="template" tagdir="/WEB-INF/tags/templates" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<template:base>
    <jsp:attribute name="title">Meine Lieblingsfilme</jsp:attribute>

    <jsp:attribute name="body">
        <nav>
            <a href="<c:url value = '/create'/>">Neuen Film anlegen</a>
        </nav>
        
        <ul>
            <c:forEach items="${movies}" var="movie">
                <li>
                    ${movie.name} (${movie.releaseYear})
                </li>
            </c:forEach>
        </ul>
    </jsp:attribute>
</template:base>