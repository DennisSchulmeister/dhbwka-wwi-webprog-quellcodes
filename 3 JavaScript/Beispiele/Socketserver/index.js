const net = require("net");

const listen_ip = "localhost";
const listen_port = 7000;

let server = net.createServer((socket) => {
    // Begrüßungsnachricht an den Client senden
    socket.setEncoding("utf-8");
    socket.setNoDelay();

    socket.write("READY!\n");

    // Nachrichten des Clients empfangen und verarbeiten
    socket.on("data", (data) => {
        data = data.replace(/\s+$/g, "");
        let cmd = data.split(" ")[0];
        let val = data.split(" ").slice(1).join(" ");

	console.log(`Empfange Befehl: ${cmd} ${val}`);

        switch (cmd) {
            case "IAM":
                socket.write(`HELLO ${val}. How are you?\n`);
                break;
            case "GOOD":
                socket.write("That's nice to hear. :-)\n");
                break;
            case "BAD":
                 socket.write("I'm so sorry. You know, I also don't feel that good ...\n");
                 break;
            case "BYE":
                socket.end("BYE\n");
                break;
            default:
                socket.write("UNKNOWN MESSAGE\n");
                break;
        }
    });
});

console.log(`Server empfängt auf ${listen_ip}:${listen_port}`)
server.listen(listen_port, listen_ip);
