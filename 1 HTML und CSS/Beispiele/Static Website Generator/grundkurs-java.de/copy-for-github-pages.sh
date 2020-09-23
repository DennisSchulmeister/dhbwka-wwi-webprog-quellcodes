#! /bin/sh

# Seite bauen
cactus build

# Gebaute Dateien nach ../docs kopieren, weil GitHub Pages diese dort erwartet
rm -rf ../docs
mkdir ../docs
cp -r .build/* ../docs

# Pfad für statische Dateien in den generierten HTML-Dateien anpassen.
# Leide geht Cactus davon aus, dass die Seite immer im Wurzelverzeichnis
# des Servers liegt. Bei GitHub Pages liegt sie aber in einem Unterverzeichnis,
# das wie das Repository heißt! Zum Beispiel:
#
# https://dennisschulmeister.github.io/test-cactus/
# https://{username}.github.io/{repository}
REPO=test-cactus
cd ../docs
find -path '*.html' -exec replace 'href="/' 'href="/'$REPO'/' -- {} \;
find -path '*.html' -exec replace 'src="/' 'src="/'$REPO'/' -- {} \;
#find -path '*.html' -exec replace /static/ /$REPO/static/ -- {} \;
