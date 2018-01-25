import * as http from "http";
import App from "./app";

App.set('port', 3000);

const server = http.createServer(App);
server.listen(3000);

server.on('listening', onListening);

function onListening(): void {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
  }
  
