const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// const customer = [
//     { id: '1', name: 'Pranav Rparelia', email: 'pranavruparelia9@gmail.com', age: 23 },
//     { id: '2', name: 'Steve Smith', email: 's_smith@gmail.com', age: 25 },
//     { id: '3', name: 'Sara Khan', email: 'sk786@gmail.com', age: 21 },
// ];

// Type Customer
const CustomerType = new GraphQLObjectType({
    name: 'customer',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'rootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/customers/' + args.id).then(
                    res => res.data
                );
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/customers/').then(
                    res => res.data
                );
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: "customerMutation",
    fields: {
        addCustomer: {
            type: CustomerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parentValue, args) {
                return axios.post("http://localhost:3000/customers/", {
                    name: args.name,
                    email: args.email,
                    age: args.email
                }).then(
                    res => res.data
                );
            }
        },
        deleteCustomer: {
            type: CustomerType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args) {
                return axios.delete("http://localhost:3000/customers/" + args.id).then(
                    res => res.data
                );
            }
        },
        updateCustomer: {
            type: CustomerType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parentValue, args) {
                return axios.put("http://localhost:3000/customers/" + args.id, {
                    name: args.name,
                    email: args.email,
                    age: args.age
                }).then(
                    res => res.data
                );
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});