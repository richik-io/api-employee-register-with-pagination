const http = require("http");
const app = require("./app");
const sequelize = require('sequelize');

const port = 3000;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`server running in port ${port}`);
});
