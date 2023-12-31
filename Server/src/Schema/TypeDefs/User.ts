import {GraphQLObjectType, GraphQLID, GraphQLString} from 'graphql'
export const UserType=new GraphQLObjectType({
    name: "User",
    fields:()=>({
        id:{type:GraphQLID},
        firstName:{type:GraphQLString},
        lastName:{type:GraphQLString},
        email:{type:GraphQLString},
        username:{type:GraphQLString},
        password:{type:GraphQLString},
        mobile:{type:GraphQLString},
        state:{type:GraphQLString},
        city:{type:GraphQLString},
    })
})