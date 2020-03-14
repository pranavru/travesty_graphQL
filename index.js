const express = require('express');
const expressGraphQL = require('express-graphql');
const app = express();
const schema_todos = require('./routers/schema_todos')

app.use('/graphql', expressGraphQL({ schema: schema_todos, pretty: true, graphiql: true }));

app.listen(4000, () => {
    console.log('GraphQL Server is now running on localhost:4000');
});

  // const mongooseConnection = mongoose.connection;
// mongoose.connect(config.get("dbConnectionString"));
// mongooseConnection.on("connected", () => {
//     console.log("Server has established a mongoose connection")
// });
