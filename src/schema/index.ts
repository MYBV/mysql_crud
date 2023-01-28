//###############################################################
import { GraphQLSchema, GraphQLObjectType } from "graphql";
import {
    CREATE_USER,
    DELETE_USER,
    UPDATE_USER,
} from "./mutations/user.mutation";
import { GREETING } from "./querys/Greeting";
import { GET_ALL_USERS, GET_USER } from "./querys/user.query";
//###############################################################

//###############################################################
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        greeting: GREETING,
        getAllUsers: GET_ALL_USERS,
        getUser: GET_USER,
    },
});
//###############################################################

//###############################################################
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: CREATE_USER,
        deleteUser: DELETE_USER,
        updateUser: UPDATE_USER,
    },
});
//###############################################################

//###############################################################
export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
//###############################################################
