import {GraphQLList} from "graphql"
import { UserType } from "../TypeDefs/User"
import {Users} from '../../Entities/Users'
import {GraphQLObjectType, GraphQLID, GraphQLString} from 'graphql'

export const GET_ALL_USERS={
    type: new GraphQLList(UserType),
    resolve() {
        return Users.find()
    }
}

export const GET_USER_BY_ID={
    type: new GraphQLList(UserType),
    args:{
        id:{type:GraphQLID},
    },
    async resolve(pare:any, args:any) {
        const {id}=args
        return Users.find({
            where:{
                id:id
            }
        });
    }
}