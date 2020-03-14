const axios = require('axios');
const { GraphQLNonNull, GraphQLObjectType, GraphQLString } = require('graphql');

const TodoType = require('./todoModel');
const serviceURL = require('../assets/URLs/serviceURL').serviceURLTodos;

module.exports = TodoMutation = new GraphQLObjectType({
    name: "todoMutation",
    fields: {
        addTodo: {
            type: TodoType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, args) {
                return axios.post(serviceURL, {
                    title: args.title,
                    completed: false
                }).then(
                    res => res.data
                );
            }
        },
        deleteTodo: {
            type: TodoType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args) {
                return axios.delete(serviceURL + args.id).then(
                    res => res.data
                );
            }
        },
        editTodo: {
            type: TodoType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                title: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                return axios.put(serviceURL + args.id, {
                    title: args.title,
                    completed: false,
                }).then(
                    res => res.data
                );
            }
        },
        todoCompleted: {
            type: TodoType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                title: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                return axios.put(serviceURL + args.id, {
                    title: args.title,
                    completed: true,
                }).then(
                    res => res.data
                );
            }
        }
    }
});