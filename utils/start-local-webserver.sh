#! /bin/sh

# Hilfsskript zum Starten eines lokalen Webservers.
# Der Server muss hierzu mit folgendem Befehl installiert werden:
#
#   npm install http-server -g

set -m

# Linux: xdg-open
# macOS: open
which xdg-open > /dev/null

if [ $? -eq 0 ]; then
    OPEN="xdg-open"
else
    OPEN="open"
fi

http-server ./ -p 1337 &
$OPEN http://localhost:1337/index.html &
fg %1
