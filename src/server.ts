import * as http from "http";
import App from "./app";

App.set('port', 3000);

const server = http.createServer(App);
server.listen(3000);

server.on('listening', onListening);

function onListening(): void {
    let address = server.address();
    let bind = (typeof address === 'string') ? `pipe ${address}` : `port ${address.port}`;
    console.log(`Listening on ${bind}`);
}
  
