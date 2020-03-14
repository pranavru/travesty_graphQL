const express = require('express');
const expressGraphQL = require('express-graphql');

const schema = require('./Users/userSchema');
const schema_todos = require('./Todos/todoSchema');

const app = express();

app.use('/graphql/todos', expressGraphQL({ schema: schema_todos, pretty: true, graphiql: true }));
app.use('/graphql/users', expressGraphQL({ schema: schema, pretty: true, graphiql: true }));

app.listen(4000, () => {
    console.log('GraphQL Server is now running on localhost:4000');
});

  // const mongooseConnection = mongoose.connection;
// mongoose.connect(config.get("dbConnectionString"));
// mongooseConnection.on("connected", () => {
//     console.log("Server has established a mongoose connection")
// });
