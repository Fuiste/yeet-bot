"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const client_1 = require("./client");
const environment_1 = require("./environment");
// Set up a webserver for monitoring
const app = Express();
app.disable('x-powered-by');
app.all('*', (req, res) => {
    if (req.url === '/status') {
        // Health check
        res.status(200);
        res.contentType('text/plain');
        res.send("OK");
    }
});
app.listen(environment_1.PORT, () => {
    console.log("Yeet server is running :)");
    // Log into Discord
    client_1.client.login(environment_1.DISCORD_TOKEN);
});
