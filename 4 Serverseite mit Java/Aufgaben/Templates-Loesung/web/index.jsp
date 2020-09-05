<%@taglib prefix="template" tagdir="/WEB-INF/tags/templates" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<template:base>
    <jsp:attribute name="title">Startseite</jsp:attribute>

    <jsp:attribute name="body">
        <ul>
            <li>
                <a href="ehrenamt.jsp">Nur kein Ehrenamt</a>
            </li>
            <li>
                <a href="santa.jsp">Is Santa Claus A Sysadmin?</a>
            </li>
        </ul>
    </jsp:attribute>
</template:base>