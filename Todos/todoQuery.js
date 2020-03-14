const axios = require('axios');

const { GraphQLList, GraphQLObjectType } = require('graphql');
const TodoType = require('./todoModel');
const serviceUrl = require('../assets/URLs/serviceURL').serviceURLTodos;

module.exports = TodoQuery = new GraphQLObjectType({
    name: 'todoQueryType',
    fields: {
        todos: {
            type: new GraphQLList(TodoType),
            resolve(parentValue, args) {
                return axios.get(serviceUrl).then(
                    res => res.data
                );
            }
        }
    }
});
