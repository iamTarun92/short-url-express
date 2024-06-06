const hostname = "127.0.0.1";
const port = 4000;
const dbName = "db-1";
const mongoURI = `mongodb://${hostname}:27017/${dbName}`;
const JWT_SECRET = "secretkey";

module.exports = { hostname, port, dbName, mongoURI, JWT_SECRET };
