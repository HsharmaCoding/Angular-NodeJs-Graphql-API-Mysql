import { UserType } from "../TypeDefs/User";
import {GraphQLObjectType, GraphQLID, GraphQLString} from 'graphql'
import {Users} from "../../Entities/Users"
import { error } from "console";
import {MessageType} from "../TypeDefs/Messages"

export const CREATE_USER={
    type:MessageType,
    args:{
        firstName:{type:GraphQLString},
        lastName:{type:GraphQLString},
        email:{type:GraphQLString},
        username:{type:GraphQLString},
        password:{type:GraphQLString},
        mobile:{type:GraphQLString},
        state:{type:GraphQLString},
        city:{type:GraphQLString},
    },
    async resolve(pare:any, args:any){
        const {firstName,lastName,email,username,password,mobile,state,city} = args;
        await Users.insert({firstName,lastName,email,username,password,mobile,state,city});
        return {successful:true,message:"CREATE SUCCESSFUL"}
    }
}

export const UPDATE_PASSWORD={
    type:MessageType,
    args:{
        username:{type:GraphQLString},
        oldPassword:{type:GraphQLString},
        newPassword:{type:GraphQLString}
    },
    async resolve(pare:any, args:any){
        const {username, oldPassword, newPassword}=args
        const user=await Users.findOne({
            where:{
                username:username
            }
        });

        const userPassword=user?.password;

        if(oldPassword===userPassword){
            return await Users.update({username:username},{password:newPassword})

        }else{
            throw new Error("Current password is incorrect.")
        }
    }
}

export const UPDATE_USER={
    type:MessageType,
    args:{
        id:{type:GraphQLID},
        firstName:{type:GraphQLString},
        lastName:{type:GraphQLString},
        email:{type:GraphQLString},
        username:{type:GraphQLString},
        password:{type:GraphQLString},
        mobile:{type:GraphQLString},
        state:{type:GraphQLString},
        city:{type:GraphQLString},
    },
    async resolve(pare:any, args:any){
        const {id,firstName,lastName,email,username,password,mobile,state,city}=args
        const user=await Users.findOne({
            where:{
                id:id
            }
        });

        if(user!=null && user!=undefined){
            await Users.update({id:id},{firstName:firstName,lastName:lastName,email:email,username:username,password:password,mobile:mobile,state:state,city:city})
            return {successful:true,message:"UPDATE SUCCESSFUL"}
        }
        else{
            throw new Error("USER NOT FOUND")
        }
    }
}


export const DELETE_USER={
    type:MessageType,
    args:{
        id:{type:GraphQLID},
    },
    async resolve(pare:any, args:any){
        const id=args.id

        const user=await Users.findOne({
            where:{
                id:id
            }
        });

        if(user!=null && user!=undefined){
            await Users.delete(id)
            return {successful:true,message:"UPDATE SUCCESSFUL"}
        }
        else{
            throw new Error("USER NOT FOUND")
        }
        return {successful:true,message:"DELETE SUCCESSFUL"}
    }
}