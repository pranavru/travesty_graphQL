const { GraphQLBoolean,GraphQLObjectType, GraphQLString } = require('graphql');

module.exports = TodoType = new GraphQLObjectType({
    name: 'todo',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        completed: { type: GraphQLBoolean }
    }),
});

