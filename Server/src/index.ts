import express from 'express';
import {graphqlHTTP} from "express-graphql";
import {schema} from './Schema'
import cors from "cors";
import {createConnection} from "typeorm";
import {DataSource} from "typeorm";
import {Users} from './Entities/Users'

const main = async () => {

    // const connectDB=new DataSource({
    //     type:"mysql",
    //     database:"graphqlcrud",
    //     username:"root",
    //     password:"Admin@123",
    //     logging:true,
    //     synchronize:true,
    //     entities:[Users],
    // })

    // connectDB
    // .initialize()
    // .then(()=>{
    //     console.log("Data source has been initialized");
    // })
    // .catch(err=>{
    //     console.log("Data source initialization error", err);
    // })

    await createConnection({
        type:"mysql",
        host:"localhost",
        port:3306,
        database:"graphqlcrud",
        username:"root",
        password:"Admin@123",
        logging:true,
        synchronize:true,
        entities:[Users],
    })
    const app=express()
    app.use(cors())
    app.use(express.json())
    app.use("/graphql",graphqlHTTP({
        schema,
        graphiql:true
    }))
    app.listen(3001,()=>{
        console.log("Server Running on port 3001");
    })
};

main().catch((err)=>{
    console.log(err);
});