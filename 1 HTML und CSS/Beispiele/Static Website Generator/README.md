Beispiel zur Nutzung eines Static Website Generators
====================================================

Inhaltsverzeichnis
------------------

 * [Problemstellung](#problemstellung)
 * [Verwendete Software](#verwendete-software)
 * [Ausführen des Demoprojekts](#ausführen-des-demoprojekts)
 * [Aufbau des Quellcodes](#aufbau-des-quellcodes)
 * [Deployment auf einem Webserver](#deployment-auf-einem-webserver)
 * [Weitere Informationen](#weitere-informationen)


Problemstellung
---------------

Bisher haben wir in der Vorlesung nur einfache Webseiten betrachtet, die aus einer einzigen
HTML-Datei bestehen. Zum Kennenlernen von HTML und CSS ist das in Ordnung, echte Webseiten
bestehen in der Regel aber oft aus mehreren HTML-Dateien, die einer einheitlichen Struktur
folgen sollen, um ein einheitliches Erscheinungsbild zu liefern. Anhand einer typischen
Firmenwebseite lässt sich dies gut verdeutlichen. Diese besteht in der Regel aus mehreren
Unterseiten, die jeweils in einer eigenen HTML-Datei definiert sind:

 1. Startseite
 2. Produkte der Firma
 3. Mitglieder des Managements
 4. Kontaktformular
 5. Impressum

Technisch gesehen muss für jede Unterseite eine eigene HTML-Datei ausprogrammiert werden.
Damit für die Besucher*innen aber der Eindruck einer einheitlichen Webseite entsteht,
muss jede HTML-Datei dieselben Grundelemente wie Kopfbereich, Navigationsmenü, Fußbereich
und so weiter beinhalten. Auch muss jede HTML-Datei einem einheitlichen Layout folgen.

Bisher können wir schon die „Gestaltungsregeln” in Stylesheet-Dateien auslagern und diese
in jeder HTML-Datei einbinden. Dadurch wird immerhin sichergestellt, dass die Inhalte der
HTML-Dateien einheitlich formatiert werden. Ungelöst ist aber noch das Problem, wie wir
einen einheitlichen Aufbau der HTML-Dateien erzielen können, ohne die allgemeinen Teile
wie Kopf- und Fußbereich in jeder HTML-Datei immer wieder aufs Neue ausprogrammieren zu
müssen. Die einzige Lösung, die wir bisher kennen, ist diese Inhalte per Copy & Paste in
jede HTML-Datei zu kopieren (oder die Dateien gleich durch Kopieren einer Vorlagedatei zu
erzeugen) und zu hoffen, dass sie sich später nicht mehr all zu oft ändern werden.

Doppelter Quellcode ist beim Programmieren eigentlich so gut wie immer schlecht. Wir
benötigen daher eine einfache Möglichkeit, den mehrfach benötigten HTML-Code irgendwie
auszulagern, so dass er nur einmal ausprogrammiert, aber in jeder Unterseite verwendet
werden kann. Kurz um: Wir müssen das Grundgerüst der HTML-Dateien von ihrem Inhalt
trennen. Wir benötigen eine Unterscheidung zwischen „Template“ und „Content”, so dass
die allgemeingültigen Teile, die auf jeder Seite erscheinen sollen, in einem zentralen
Template definiert werden, in welches der Inhalt der einzelnen Seiten automatisch
eingefügt wird.

Diese Grundidee liegt eigentlich allen Methoden zur dynamischen Erzeugung von Webinhalten
zugrunde. Unterschiede gibt es jedoch darin, in welcher Form Templates und Content definiert
werden sowie wann und wie diese zusammengefügt werden. Mit Blick auf das Wann und Wie lassen
sich folgende drei Ansätze unterscheiden:

  1. Zur Laufzeit auf der Serverseite, wenn eine Seite angefordert wird
  2. Zur Laufzeit auf der Clientseite, wenn die Seite dargestellt wird
  3. Während der Programmierung auf dem Rechner der/des Entwickler*in

Die ersten beiden Ansätze schauen wir uns zu einem späteren Zeitpunkt an, wenn wir uns
mit JavaScript beschäftigen. Hier soll es stattdessen um die dritte Möglichkeit gehen,
beim Programmieren einen Generierungsschritt einzubauen, durch den Template und Inhalt
zu den finalen HTML-Seiten zusammengesetzt werden, die wir dann nur noch auf einen
Webserver hochladen brauchen. Dies bietet sich immer dann an, wenn die Webseite ohnehin
nur von wenigen Personen betreut wird (oft ist es ja nur eine Person) und sich die
Inhalte auch nur vergleichweise selten ändern. Dann werden die zusätzliche Rechenleistung
und Energie, bei jedem Aufruf der Webseite immer die genau gleichen HTML-Inhalte dynamisch
zu generieren gar nicht benötigt. Dann reicht es aus, die HTML-Dateien einmal vorab zu
erzeugen und dann nur noch als statische Dateien von einem Webserver abzurufen.


Verwendete Software
-------------------

Generatoren für statische Webseiten gibt es wie Sand am Meer. Gefühlt kommen auf jede
einzelne Webseite im Internet bis zu drei Generatorprogramme. Man könnte fast meinen,
es gibt mehr Generatoren als Webseiten im Internet. Eine kuratierte Liste gibt es
zum Beispiel hier: [Awesome Static Generators](https://github.com/myles/awesome-static-generators)

In diesem Beispiel wird die in Python programmierte Anwendung
[Cactus](https://github.com/eudicots/Cactus) verwendet. Der Grund hierfür ist, dass sie
nur die wichtigsten Funktionen implementiert und somit wesentlich überschaubarer als
viele andere Produkte ist. Außerdem werden die HTML-Templates in der
[Django Template Language](https://docs.djangoproject.com/en/dev/topics/templates/)
geschrieben, die eine gute Strukturierung der Templates ermöglicht.


Ausführen des Demoprojekts
--------------------------

Zur Ausführung des Beispiels muss [Python](https://python.org/) auf dem eigenen Rechner
installiert sein. Alternativ kann das Beispiel auch auf [gitpod.io](https://gitpod.io)
in deren Online-IDE ausgeführt werden.

Auf dem eigenen Rechner empfiehlt es sich, zunächst ein Python-Environment anzulegen,
um darin die abhängigen Pakete installieren zu können. Auf `gitpod.io` entfällt dieser
Schritt:

  *Linux, Unix, Mac:*

  ```bash
  python -m venv env
  . env/bin/activate
  ```

  *Windows:*
  ```cmd
  python -m venv env
  env\bin\activate
  ```

Anschließend können die Abhängigkeiten installiert werden:

  ```bash
  pip install -r requirements.txt
  ```

Dadurch steht dann der neue Befehl `cactus` zur Verfügung:

  * `cactus create verzeichnis`: Legt ein neues Projekt im übergebenen Verzeichnis an
  * `cactus serve`: Startet einen lokalen Entwicklungsserver zum Testen der Seite
  * `cactus build`: Baut die finalen HTML-Dateien, die anschließend deployed werden könnnen

Die letzten beiden Befehle funktionieren nur, wenn man zuvor in das Unterverzeichnis
mit den Quelldateien des eigentlichen Projekts gewchselt hat:

  ```bash
  cd grundkurs-java.de
  ```

Die URL zum Testen der Seite mit dem lokalen Entwicklungsserver lautet
[http://localhost:8000](http://localhost:8000).


Aufbau des Quellcodes
---------------------

Alle Dateien des eigentlichen Demoprojekts liegen im Unterverzeichnis `grundkurs-java.de`.
Dieses besitzt wiederum die folgenden Dateien und Unterverzeichnisse:

  - `static/`: Statische Dateien, die unverändert übernommen werden (Stylesheets, Bilder, …)
  - `templates/`: HTML-Templates für das Grundgerüst der generierten HTML-Dateien
  - `pages/`: HTML-Dateien mit den eigentlichen Inhalten der einzelnen Seiten
  - `.build/`: Zielverzeichnis, in dem die generierten Dateien abgelegt werden.

Technisch gesehen handelt es sich sowohl bei den Dateien im `templates/`-Verzeichnis
als auch bei den Dateien im `pages/`-Verzeichnis zum Django Templates. Der Unterschied
besteht lediglich darin, dass nur für die Dateien im `pages/`-Verzeichnis tatsächlich
eine gleichlautende HTML-Datei generiert wird. Dabei kann im Quellcode auf die Templates
im `template/`-Verzeichnis zugegriffen werden.

Im einfachsten Fall gibt es in `templates/` daher genau eine HTML-Datei, die in etwa
wie folgt aufgebaut ist:

  ```html
  <!DOCTYPE html>
  <html>
      <head>
          <meta charset="utf-8" />
          <title>{{ title }} – Meine Seite</title>
          <link rel="stylesheet" href="{% static 'style.css' %}">
          ...
      </head>
      <body>
          <h1>{{ title }}</h1>
          ...
          {% block content %}
          {% endblock %}

          <nav>
              <ul>
                  <li>
                      <a href="{% url '/index.html' %}">Startseite</a>
                  </li>
                  <li>
                      <a href="{% url '/management.html' %}">Management</a>
                  </li>
              </ul>
          </nav>
          ...
      </body>
  </html>
  ```

`{{ title }}` und `{% block content %}{% endblock %}` sind dabei die Platzhalter,
deren Inhalte später ersetzt werden, wobei ersteres eine Art Variable und letzteres
einen `content` genannten HTML-Block darstellt. Es können beliebig viele solcher
Variablen und HTML-Blöcke definiert werden.

Die eigentlichen Inhaltdateien im `pages/`-Verzeichnis können sich nun wie folgt
darauf beziehen:

  ```html
  title: Startseite

  {% extends "base.html" %}

  {% block content %}
      <p>
          Hier steht der Inhalt der Seite.
      </p>
  {% endblock %}
  ```

`base.html` ist dabei der Name der Datei im `template/`-Verzeichnis. Wie man sieht,
werden die einfachen Variablen einfach am Anfang der Datei mit `Name: Wert` mit
Inhalten versorgt. Die HTML-Blöcke werden dann weiter unten mit `{% block name %}{% endblock %}`
eingerahmt.

Darüber hinaus gibt es noch weitere Möglichkeiten, die in der Django-Dokumentation
ausführlich beschrieben sind (Fallunterscheidungen, Schleifen, Filter, Template-Vererbung, …).
Für einfache Seiten reicht das hier gezeigte Beispiel aber schon aus.


Deployment auf einem Webserver
------------------------------

Da alle Dateien zu Komplilierzeit vorab erzeugt werden, werden an den Webserver überhaupt
keine besonderen Anforderungen gestellt. Er muss lediglich in der Lage sein, statische
Dateien auszuliefern, was ja die Hauptaufgabe eines Webservers ist. Darüber hinaus muss
er keine weiteren Funktionen bietet. Als Deployment-Optionen bieten sich daher an:

  1. Klassisches Hosting bei Anbietern wie 1&1 oder Strato
  2. Upload auf surge.sh mit dem Surge Kommandozeilentool
  3. Hosting in einem Git-Repository via Github Pages
  4. Betrieb eines eigenen Webservers in einer Linux VM

Option eins bis drei machen die wenigste Arbeit. Option vier macht am meisten Spaß und
bietet die größte Flexibilität.

Egal, für welche Option man sich entscheidet. Es müssen lediglich nach dem Bauen der
Seite die Inhalte der `.build/`-Verzeichnisses auf dem Server abgelegt werden.


Weitere Informationen
---------------------

Eine kleine Dokumentation zu Cactus findet sich in der
[README-Datei auf GitHub](https://github.com/eudicots/Cactus).

Die Django Template Language ist im der
[Onlinedokumentation von Django](https://docs.djangoproject.com/en/dev/topics/templates/)
beschrieben.
