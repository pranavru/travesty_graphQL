const { GraphQLSchema } = require('graphql');

const TodoQuery  = require('./todoQuery');
const TodoMutation = require('./todoMutation');

module.exports = new GraphQLSchema({
    query: TodoQuery,
    mutation: TodoMutation
});