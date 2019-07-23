"use strict";

/**
 * Klasse App: Steuert die gesamte Anwendung
 *
 * Diese Klasse kümmert sich darum, dass die vom Anwender ausgewählte Seite
 * mit der Listenübersicht oder dem Eingabeformular angezeigt wird. Welche
 * Seite angezeigt wird, macht sie im Kopfbereich der Seite kenntlich.
 *
 * Außerdem enthält sie die eigentliche Datenlist, in der die Adressen
 * gespeichert sind.
 */
class App {
    /**
     * Konstruktor.
     * @param {Liste} pages Seiten, zwischen denen umgeschaltet werden kann
     */
    constructor(pages) {
        // Verfügbare Seiten und Steuerobjekt der aktuellen Seite
        this._pages = pages;
        this._currentPageObject = null;

        // Datensätze unserer Anwendung. Falls Sie die Anwendung erweitern
        // wollen, so dass die Datensätze nicht verloren gehen können, müssten
        // Sie hier die Datensätze komplett einlesen und wiederherstellen.
        this._data = [
            {
                first_name: "Willy",
                last_name: "Tanner",
                phone: "+49 711 564412",
                email: "willy.tanner@alf.com",
            },
            {
                first_name: "Michael",
                last_name: "Knight",
                phone: "+49 721 554194",
                email: "michael@knight-rider.com",
            },
            {
                first_name: "Fox",
                last_name: "Mulder",
                phone: "+49 721 553181",
                email: "mulder@xfiles.com",
            },
            {
                first_name: "Dana",
                last_name: "Scully",
                phone: "+49 721 572287",
                email: "scully@xfiles.com",
            },
            {
                first_name: "Elwood",
                last_name: "Blues",
                phone: "+49 721 957338",
                email: "elwood@blues-brothers.com",
            },
        ];

        // Interne Methode zum Rendern des Menüs aufrufen
        this._renderMenu();
    }

    ////
    //// Umschalten der aktuell sichtbaren Seite
    ////

    /**
     * Tablaschen zum Umschalten der aktuellen Seite anzeigen. (Interne Methode)
     */
    _renderMenu() {
        let ul = document.querySelector("#app-menu > ul");
        let template = document.getElementById("template-app-menu-li").innerHTML;

        this._pages.forEach(page => {
            // Versteckte Seiten überspringen
            if (page.hidden) return;

            // Neues Element auf Basis des Templates erzeugen
            let dummy = document.createElement("ul");
            dummy.innerHTML = template;
            dummy.innerHTML = dummy.innerHTML.replace("$NAME$", page.name);
            dummy.innerHTML = dummy.innerHTML.replace("$LABEL$", page.label);

            // Event Listener auf das <li>-Element registrieren
            let li = dummy.firstElementChild;
            li.addEventListener("click", () => this.showPage(page.name));

            // Element nun in das Menü umhängen
            dummy.removeChild(li);
            ul.appendChild(li);
        });
    }

    /**
     * Umschalten der sichtbaren Seite.
     *
     * @param  {String} name Name der anzuzeigenden Seite, gemäß this.pages
     * @param  {Integer} editIndex Nummer des bearbeiteten Datensatzes (optional)
     */
    showPage(name, editIndex) {
        // Gewünschte Seite suchen
        let newPage = this._pages.find(p => p.name === name);

        if (newPage === undefined) {
            console.error(`Klasse App, Methode showPage(): Ungültige Seite „${name}”`);
            return;
        }

        // Aktuelle Seite ausblenden
        if (this._currentPageObject != null) {
            this._currentPageObject.hide();
        }

        // Neue Seite anzeigen und merken
        this._currentPageObject = new newPage.klass(this, name, editIndex);
        this._currentPageObject.show();

        // Aktuelle Seite im Kopfbereich hervorheben
        document.querySelectorAll("#app-menu li").forEach(li => li.classList.remove("active"));
        document.querySelectorAll(`#app-menu li[data-page-name="${name}"]`).forEach(li => li.classList.add("active"));
    }

    ////
    //// Methoden zum Bearbeiten der Datensätze
    ////
    //// Falls Sie die Anwendung so erweitern wollen, dass die Datensätze
    //// nicht verloren gehen können, müssen Sie die Änderungen in den
    //// nachfolgenden Methoden irgendwie dauerhaft speichern.
    ////

    /**
     * Gibt die komplette Liste mit allen Daten zurück.
     * @return {Array} Array mit allen Datenobjekten
     */
    getData() {
        return this._data;
    }

    /**
     * Gibt den Datensatz mit dem übergebenen Index zurück. Kann der Datensatz
     * nicht gefunden werden, wird undefined zurückgegeben.
     *
     * @param  {Integer} index Index des gewünschten Datensatzes
     * @return {Object} Gewünschter Datensatz oder undefined
     */
    getDataByIndex(index) {
        return this._data[index];
    }

    /**
     * Aktualisiert den Datensatz mit dem übergebenen Index und überschreibt
     * ihn mit dem ebenfalls übergebenen Objekt. Der Datensatz muss hierfür
     * bereits vorhanden sein.
     *
     * @param {Integer} index Index des zu aktualisierenden Datensatzes
     * @param {Object} dataset Neue Daten des Datensatzes
     */
    updateDataByIndex(index, dataset) {
        this._data[index] = dataset;
    }

    /**
     * Löscht den Datensatz mit dem übergebenen Index. Alle anderen Datensätze
     * rücken dadurch eins vor.
     *
     * @param {[type]} index Index des zu löschenden Datensatzes
     */
    deleteDataByIndex(index) {
        this._data.splice(index, 1);
    }

    /**
     * Fügt einen neuen Datensatz am Ende der Liste hinzu.
     *
     * @param  {Object} dataset Neu anzuhängender Datensatz
     * @return {Integer} Index des neuen Datensatzes
     */
    appendData(dataset) {
        this._data.push(dataset);
        return this._data.length - 1;
    }
}
