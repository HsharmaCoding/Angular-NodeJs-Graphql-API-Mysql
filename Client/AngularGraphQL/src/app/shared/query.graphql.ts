import gql from 'graphql-tag';

export const GET_USERS = gql`
  query AllUsers {
    getAllUsers {
        id
        firstName
        lastName
        email
        username
        password
        mobile
        state
        city    
    }
  }
`;

export const GET_USE_BY_ID = gql`
  query getUserById($id: ID!) {
    getUserById(id: $id) {
        id
        firstName
        lastName
        email
        username
        password
        mobile
        state
        city    
    }
  }
`;

export const CREATE_USER = gql`
mutation createUser($firstName:String!, $lastName:String!, $email: String!,$username:String!,$password:String!,$mobile:String!,$state:String!,$city:String!){
  createUser(firstName:$firstName,lastName:$lastName,email:$email,username:$username,password:$password,mobile:$mobile,state:$state,city:$city){
    successful
    message 
  }
}
`;

export const UPDATE_USER = gql`
mutation updateUser($id:ID!,$firstName:String!, $lastName:String!, $email: String!,$username:String!,$password:String!,$mobile:String!,$state:String!,$city:String!){
  updateUser(id:$id,firstName:$firstName,lastName:$lastName,email:$email,username:$username,password:$password,mobile:$mobile,state:$state,city:$city){
    successful
    message 
  }
}
`;

export const DELETE_USER = gql`
mutation deleteUser($id:ID!){
  deleteUser(id:$id){
    successful
    message 
  }
}
`;