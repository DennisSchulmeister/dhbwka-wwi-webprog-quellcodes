/**
 * Tabreiter werden wie folgt definiert:
 *
 *     <ul class="tab-items">
 *         <li class="tab-item active">
 *             <a href="#tabpage-1">Titel 1</a>
 *             <div class="tab-indicator"></div>
 *         </li>
 *         <li class="tab-item">
 *             <a href="#tabpage-2">Titel 2</a>
 *             <div class="tab-indicator"></div>
 *         </li>
 *         <li class="tab-item">
 *             <a href="#tabpage-3">Titel 3</a>
 *             <div class="tab-indicator"></div>
 *         </li>
 *     </ul>
 *
 *     <div id="tabpage-1" class="tab-page">
 *         Inhalt für Tabreiter 1
 *     </div>
 *
 *     <div id="tabpage-2" class="tab-page">
 *         Inhalt für Tabreiter 2
 *     </div>
 *
 *     <div id="tabpage-3" class="tab-page">
 *         Inhalt für Tabreiter 3
 *     </div>
 *
 * Hier werden nach dem Laden der Seite alle .tab-items gesucht und mit Event
 * Handlern zum Umschalten der Tabreiter versehen. Außerdem wird der erste
 * aktive Tabreiter (gekennzeichnet durch .active) angezeigt.
 */
window.addEventListener("load", () => {
    // Funktion zum Umschalten der Tabreiter
    let switchTabPage = (clickedTabItem) => {
        // Erst mal alle Tabseiten ausblenden
        clickedTabItem.parentNode.childNodes.forEach(tabItem => {
            if (tabItem.nodeType != Node.ELEMENT_NODE) return;

            tabItem.classList.remove("active");
            let tabContent = document.querySelector(tabItem.dataset.tabContent);

            if (tabContent != null) {
                tabContent.classList.add("tab-page");
            }
        });

        // Dann die ausgewählte Tabseite anzeigen
        clickedTabItem.classList.add("active");
        let tabContent = document.querySelector(clickedTabItem.dataset.tabContent);

        if (tabContent != null) {
            tabContent.classList.remove("tab-page");
        }
    };

    // Alle Tablaschen in der Seite suchen
    let tabItems = document.querySelectorAll(".tab-item");

    // Event Handler registrieren und erste Tabseite anzeigen
    tabItems.forEach(tabItem => {
        // Bist du eine aktive Tablasche? Dann Inhalt anzeigen.
        if (tabItem.classList.contains("active")) {
            switchTabPage(tabItem);
        }

        // Aktive Seite bei Klick auf die Lasche wechseln
        tabItem.addEventListener("click", event => {
            switchTabPage(event.target);
        });
    });
});
