const express = require ('express');
const { ApolloServer } = require('@apollo/server');
const bodyParser = require('body-parser');
const cors = require('cors');
const { expressMiddleware } = require('@apollo/server/express4');
const {default : axios} = require ('axios');

const {Projects} = require('./projects');
const {Tasks} = require('./tasks');

async function startServer(){
    const app = express();
    const server = new ApolloServer({
        
        typeDefs : `
        type Project {
            id: ID!
            name: String!
            ownerId: ID!
        }
        
        type Task {
            id: ID!
            title: String!
            project : Project

        }   
        type Query {
            getTasks: [Task]
            getAllProjects: [Project]
            getProject(id: ID!): Project
        }
    `,
        resolvers: {
            Task : {
                project: (project)=> Projects.find((item)=> item.id == project.id),
            },
            Query: {
                getTasks: ()=> Tasks,
                getAllProjects: ()=> Projects,
                getProject: async (parent, {id})=> Projects.find((item)=> item.id == id),
            }
        }
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();
    app.use('/graphql', expressMiddleware(server));

    app.listen(8000, ()=> console.log('Server Started'));
}

startServer();