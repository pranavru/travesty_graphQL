const graphql = require('graphql');
const TODOs = [
    {
        "id": 1446412739542,
        "title": "Read emails",
        "completed": false
    },
    {
        "id": 1446412740883,
        "title": "Buy orange",
        "completed": true
    }
];

const TodoType = new graphql.GraphQLObjectType({
    name: 'todo',
    fields: function () {
        return {
            id: {
                type: graphql.GraphQLID
            },
            title: {
                type: graphql.GraphQLString
            },
            completed: {
                type: graphql.GraphQLBoolean
            }
        }
    }
});

const queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            todos: {
                type: new graphql.GraphQLList(TodoType),
                resolve: function () {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            resolve(TODOs)
                        }, 4000)
                    });
                }
            }
        }
    }
});

var MutationAdd = {
    type: TodoType,
    description: 'Add a Todo',
    args: {
        title: {
            name: 'Todo title',
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
    },
    resolve: (root, args) => {
        var newTodo = new TODO({
            title: args.title,
            completed: false
        })
        newTodo.id = newTodo._id
        return new Promise((resolve, reject) => {
            newTodo.save(function (err) {
                if (err) reject(err)
                else resolve(newTodo)
            })
        })
    }
}

var MutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        add: MutationAdd
    }
});

module.exports = new graphql.GraphQLSchema({
    query: queryType,
    mutation: MutationType
});