import { gql } from 'apollo-boost'
// const { makeExecutableSchema, gql } = require('apollo-server');
export const GET_USERS = gql`
  query {
    users{
        id
    }
  }
`