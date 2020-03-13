const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./routers/schema');
const mongoose = require('mongoose');
const config = require('config');
const app = express();
var graphql = require ('graphql').graphql  
const schema_todos = require('./routers/schema_todos')


const mongooseConnection = mongoose.connection;
mongoose.connect(config.get("dbConnectionString"));
mongooseConnection.on("connected", () => {
    console.log("Server has established a mongoose connection")
});

// var query = 'mutation {  add(title: "Read a book") { id, title } }';
// graphql(schema_todos, query).then(function (result) {
//     console.log(JSON.stringify(result, null, " "));
// });

// app
//   .use('/', expressGraphQL({ schema: schema_todos, pretty: true }))
//   .listen(4000, function (err) {
//     console.log('GraphQL Server is now running on localhost:4000');
//   });

app.get('/', () => {
    console.log("$$$$$ ----- Connected ----- $$$$$\n Welcome to GrossTracking Application")
})

app.listen(4000, () => {
    console.log("The server is running on port 4000");
})

