const { GraphQLSchema } = require('graphql');

const UsersQuery = require('./queryUsers');
const userMutations = require('./userMutation');

module.exports = new GraphQLSchema({
    query: UsersQuery,
    mutation: userMutations
});