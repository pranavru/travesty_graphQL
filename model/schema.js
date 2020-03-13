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

module.exports = new GraphQLSchema({
    query: RootQuery
});