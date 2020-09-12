import { gql } from 'apollo-boost'
// const { makeExecutableSchema, gql } = require('apollo-server');
export const GET_USERS = gql`
  query {
    users{
        id
    }
  }
`

export const SEND_MESSAGE = gql`
  mutation testmsg($userId : String!){
    testmsg(userId: $userId)
  }
`

export const FIND_JOB_TYPES = gql`
  query {
    jobTypes{
      id
      createdAt
      updatedAt
      jobTypeName
    }
  }
`