const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql');

// Type Todo
const TodoType = new GraphQLObjectType({
    name: 'todo',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        completed: { type: GraphQLBoolean }
    }),
});

const TodoQuery = new GraphQLObjectType({
    name: 'rootQueryType',
    fields: {
        todos: {
            type: new GraphQLList(TodoType),
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/todos/').then(
                    res => res.data
                );
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: "todoMutation",
    fields: {
        addTodo: {
            type: TodoType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, args) {
                return axios.post("http://localhost:3000/todos/", {
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
                return axios.delete("http://localhost:3000/todos/" + args.id).then(
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
                return axios.put("http://localhost:3000/todos/" + args.id, {
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
                return axios.put("http://localhost:3000/todos/" + args.id, {
                    title: args.title,
                    completed: true,
                }).then(
                    res => res.data
                );
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: TodoQuery,
    mutation
});