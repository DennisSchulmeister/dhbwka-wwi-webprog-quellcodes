"use strict";

/**
 * Klasse App: Steuert die Navigation innerhalb der Anwendung
 *
 * Diese Klasse ist sozusagen die Hauptklasse unserer Anwendung. Sie kümmert
 * sich darum, den richtigen Inhalt zu finden und einzublenden, den der
 * Anwender gerade sehen will, wobei der Inhalt selbst hierfür von anderen
 * Klassen bereitgestellt wird.
 */
class App {
    /**
     * Konstruktor. Im Parameter pages muss eine Liste mit den vorhandenen
     * Seiten der App übergeben werden. Die Liste muss folgendes Format haben:
     *
     *      [
     *          {
     *              url: "^/$"              // Regulärer Ausdruck zur URL
     *              klass: PageOverview     // Klasse zur Darstellung der Seite
     *          }, {
     *              url: "^/Details/(.*)$"  // Regulärer Ausdruck zur URL
     *              klass: PageDetails      // Klasse zur Darstellung der Seite
     *          },
     *          ...
     *      ]
     *
     * @param {String} title Anzuzeigender Name der App
     * @param {List} pages Definition der in der App verfügbaren Seiten
     */
    constructor(title, pages) {
        this._title = title;
        this._pages = pages;
        this._currentPageObject = null;

        // Datenbank-Objekt zum Lesen und Speichern von Daten
        this.database = new Database();
    }

    /**
     * Startmethode der App. Hier werden die Event Listener für das generelle
     * Funktionieren der App registriert. Diese Methode muss daher aus der
     * index.html heraus aufgerufen werden.
     */
    run() {
        // Globale Event Listener registrieren
        document.querySelector("header nav .toggle-menu a").addEventListener("click", this._toggleHamburgerMenu);
        document.querySelector("header nav .go-back a").addEventListener("click", () => window.history.back());

        window.addEventListener("click", event => this._onLinkClicked(event));
        window.addEventListener("popstate", event => this._onHistoryChanged(event));

        // Erste Seite aufrufen
        this.gotoPage(location.hash.slice(1), {showFirstPage: true});
    }

    /**
     * Hilfsmethode zum Ein- und Ausblenden des Hamburger-Menüs aus kleinen
     * Bildschirmen. Die Methode wird durch einen Event Handler bei jedem
     * Klick auf das Hamburger-Icon aufgerufen.
     *
     * @param {DOMEvent} event Abgefangenes Click-Event
     */
    _toggleHamburgerMenu(event) {
        // Hamburger-Menu ein- oder ausblenden
        let menu = document.querySelector("header nav .menu-right");
        if (!menu) return;

        if (menu.classList.contains("small-screen-hidden")) {
            menu.classList.remove("small-screen-hidden");
        } else {
            menu.classList.add("small-screen-hidden");
        }

        // Weitere Behandlung des Click-Events unterbinden, da wir hier keine
        // neue Seite anfordern wollen.
        if (event) {
            event.preventDefault();
        }
    }

    /**
     * DOM Event Handler für angeklickte Links. Tatsächlich wird der Event
     * Handler nicht an die einzelnen Link-Elemente sondern an das übergeorndete
     * Window angehängt, um wirklich jeden Klick auf jeden Link abfangen zu
     * können, auch wenn der Link erst nach Registrierung des Event Handlers
     * dynamisch erzeugt wurde.
     *
     * Normale URL-Links funktionieren wie gewohnt, indem sie den Browser
     * veranlassen, eine neue URL aufzurufen. Fängt der Link jedoch mit einer
     * Raute # an, wird stattdessen die app-interne Navigation angestoßen.
     *
     * Folgender Link würde daher eine vollkommen neue Webseite laden:
     *
     *   <a href="/goto/new/page">New Page</a>
     *
     * Der folgende Link hingegen würde nur innerhalb der App eine neue
     * Unterseite aufrufen
     *
     *   <a href="#/Details/42/">Details zu Eintrag 42</a>
     *
     * @param {DOMEvent} event Abgefangenes Click-Event
     */
    _onLinkClicked(event) {
        // Angeklicktes Link-Element suchen, falls der Klick auf eine Element
        // innerhalb des eigentlichen Links erfolgt ist
        let target = event.target;
        while (target && target.nodeName != "A") target = target.parentNode;
        if (!target || target.nodeName != "A") return;

        // Aufzurufende Seite ermitteln. Hierfür muss der Link aus einem
        // Rautezeichen und dem URL-Pattern der neuen Seite bestehen.
        // Alle anderen Links sind gewöhnliche Links zum Aufruf einer neuen
        // URL und werden hier deshalb nicht behandelt.
        let href = target.getAttribute("href");
        if (href === null || !href.startsWith("#")) return;

        // Gewünschte Seite anzeigen
        let pageUrl = target.hash.slice(1);
        if (!pageUrl.length) return;

        event.preventDefault();
        this.gotoPage(pageUrl);
    }

    /**
     * DOM Event Handler für das Popstate-Event. Dieses wird vom Browser immer
     * dann geworfen, wenn sich die Navigationshistorie der Seite verändert
     * hat. In der Regel passiert dies immer dann, wenn der Anwender die
     * Vor- oder Zurück-Buttons des Browsers betätigt, oder mit JavaScript die
     * aktuelle URL geändert wird.
     *
     * Innerhalb der Methode wird aus dem Historieneintrag die URL der Seite
     * geholt und diese dann aufgerufen. Über ein Flag wird dabei sichergestellt,
     * dass dieser Aufruf keinen neuen Historieneintrag erzeugt, da sonst die
     * komplette Navigation durcheinander kommen würde.
     *
     * @param {DOMEvent} event Abgefangenes Popstate-Event
     */
    _onHistoryChanged(event) {
        let pageUrl = "";

        if (event.state) {
            // Normalerweise müsste im Historieneintrag die URL der Seite
            // stehen, die wieder angezeigt werden soll.
            pageUrl = event.state;
        } else {
            // Falls die Methode nicht durch die Vor- und Zurück-Buttons des
            // Browsers aufgerufen wurde, steht die gewünschte URL in der
            // Adresszeile des Browsers.
            pageUrl = location.hash.slice(1);
        }

        this.gotoPage(pageUrl, {noHistory: true});
    }

    /**
     * Diese Methode wertet die übergebene URL aus und sorgt dafür, dass die
     * dazu passende App-Seite geladen und angezeigt wird. Im Parameter pageUrl
     * muss hierfür die gewünschte URL ohne die führende Raute # übergeben werden.
     *
     * Optional kann als zweiter Parameter ein Konfigurationsobjekt mit folgenden
     * Werten (beide jeweils optional) übergeben werden:
     *
     *      {
     *          showFirstPage: true,
     *          noHistory: true,
     *      }
     *
     * showFirstPage wird nur beim erstmaligen Aufruf der App benötigt, um
     * doppelte Einträge im Browserverlauf zu vermeiden. Anstatt, wie sonst
     * üblich, einen neuen Historieneintrag zu erzeugen, wird beim Aufruf
     * der ersten Seite der aktuelle Eintrag (der durch das Laden der App
     * vom Server entstanden ist) überschrieben.
     *
     * noHistory wird im Popstate-Event-Handler benötigt, um die Erzeugung
     * eines Eintrags im Browserverlauf komplett zu unterbinden. Denn, wenn
     * dieses Event geworfen wird, gibt es bereits einen Eintrag im Verlauf,
     * zu dem der Anwender zurückkehren möchte. Würden wir hier einen weiteren
     * Eintrag erzeugen, würde dies die gesamte Historie durcheinander bringen.
     *
     * @param {String} pageUrl URL der anzuzeigenden App-Seite
     * @param {Object} options Detailoptionen zur Steuerung der Navigation
     */
    gotoPage(pageUrl, options) {
        // Optionen auswerten
        options = options ? options : {};
        let showFirstPage = options.showFirstPage ? options.showFirstPage : false;
        let noHistory = options.noHistory ? options.noHistory : false;

        // Eintrag im Browserverlauf erzeugen
        if (!noHistory) {
            let url = `#${pageUrl}`;
            let state = pageUrl;

            if (showFirstPage) {
                history.replaceState(state, "", url);
            } else {
                history.pushState(state, "", url);
            }
        }

        // Gewünschte Seite suchen und aufrufen
        if (pageUrl.length === 0) {
            pageUrl = "/";
        }

        let matches = null;
        let page = this._pages.find(p => matches = pageUrl.match(p.url));

        if (!page) {
            console.error(`Keine Seite zur URL ${pageUrl} gefunden!`);
            return;
        }

        this._currentPageObject = new page.klass(this);
        this._currentPageObject.show(matches);
    }

    /**
     * Angezeigten Titel der App-Seite setzen. Diese Methode muss von den
     * Page-Klassen aufgerufen werden, um den sichtbaren Titel einer Seite
     * festzulegen. Der Titel wird dann in der Titelzeile des Browsers sowie
     * im Kopfbereich der App angezeigt.
     *
     * Über das optionale Konfigurationsobjekt kann gesteuert werden, ob
     * neben dem Seitentitel ein Zurück-Button eingeblendet wird:
     *
     *      {
     *          isSubPage: true,
     *      }
     *
     * Der Zurück-Button wird nur eingeblendet, wenn isSubPage = true gesetzt
     * wird. Die Idee dahinter ist, dass eine App meistens eine zentrale
     * Startseite hat, von der aus in verschiedene Unterseiten verzweigt werden
     * kann. Jede von der Startseite aus direkt oder indirekt aufgerufene Seite
     * ist daher eine Unterseite mit Zurück-Button. Die Startseite hingegen als
     * Mutter aller Seiten besitzt keinen Zurück-Button.
     *
     * @param {String} title   Anzuzeigender Titel der App-Seite
     * @param {Object} options Detailoptionen zur Steuerung der Anzeige
     */
    setPageTitle(title, options) {
        // Optionen auswerten
        options = options ? options : {};
        let isSubPage = options.isSubPage ? options.isSubPage : false;

        // Titel setzen
        document.querySelectorAll(".page-name").forEach(e => e.textContent = title);
        document.title = `${title} – ${this._title}`;

        // Entscheiden, ob der Zurückbutton angezeigt wird, oder nicht
        if (isSubPage) {
            document.querySelector("header nav .go-back").classList.remove("hidden");
            document.querySelector("header nav .dont-go-back").classList.add("hidden");
        } else {
            document.querySelector("header nav .go-back").classList.add("hidden");
            document.querySelector("header nav .dont-go-back").classList.remove("hidden");
        }
    }

    /**
     * Seitenspezifischen CSS-Code aktivieren. Diese Methode muss von den
     * Page-Klassen aufgerufen werden, um seitenspezifische Stylesheet-Regeln
     * zu aktivieren. Das Stylesheet muss hierfür als String übergeben werden.
     *
     * @param {String} css Seitenspezifischer CSS-Code
     */
    setPageCss(css) {
        document.querySelector("#page-css").innerHTML = css;
    }

    /**
    * Austauschen des Inhalts im Kopfbereich der App. Diese Methode muss
    * von den Page-Klassen aufgerufen werden, um etwas im Kopfbereich der
    * App anzuzeigen. Hierfür muss ein (ggf. dynamisch nachgeladenes)
    * HTML-Element mit dem anzuzeigenden Inhalt übergeben werden.
    *
    * BEACHTE: Nicht das HTML-Element selbst, sondern seine Kindelemente
    * werden in der App angezeigt. Somit werden Probleme vermieden, wenn
    * das nachgeladene Element selbst ein <header> oder <main> ist, für
    * dass in der app.css bereits globale Layoutoptionen definiert sind.
    *
     * @param {HTMLElement} element HTML-Element mit dem anzuzeigenden Inhalt
     */
    setPageHeader(element) {
        let container = document.querySelector("header > .content");
        container.innerHTML = "";

        if (!element) return;
        let len = element.childNodes.length;

        for (var i = 0; i < len; i++) {
            let child = element.childNodes[0];
            element.removeChild(child);
            container.appendChild(child);
        }
    }

    /**
     * Austauschen des Inhalts im Hauptbereich der App. Diese Methode muss
     * von den Page-Klassen aufgerufen werden, um etwas im Hauptbereich der
     * App anzuzeigen. Hierfür muss ein (ggf. dynamisch nachgeladenes)
     * HTML-Element mit dem anzuzeigenden Inhalt übergeben werden.
     *
     * BEACHTE: Nicht das HTML-Element selbst, sondern seine Kindelemente
     * werden in der App angezeigt. Somit werden Probleme vermieden, wenn
     * das nachgeladene Element selbst ein <header> oder <main> ist, für
     * dass in der app.css bereits globale Layoutoptionen definiert sind.
     *
     * @param {HTMLElement} element HTML-Element mit dem anzuzeigenden Inhalt
     */
    setPageContent(element) {
        let container = document.querySelector("#app-main-area");
        container.innerHTML = "";

        if (!element) return;
        let len = element.childNodes.length;

        for (var i = 0; i < len; i++) {
            let child = element.childNodes[0];
            element.removeChild(child);
            container.appendChild(child);
        }
    }
}
