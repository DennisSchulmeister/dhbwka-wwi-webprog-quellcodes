REM Hilfsskript zum Starten eines lokalen Webservers.
REM Der Server muss hierzu mit folgendem Befehl installiert werden:
REM
REM   npm install http-server -g

start /b http-server ./ -p 1337
start /max http://localhost:1337/index.html
