import { gql } from 'apollo-boost'
// const { makeExecutableSchema, gql } = require('apollo-server');
// export const GET_USERS = gql`
//   query {
//     users{
//         id
//     }
//   }
// `
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

export const CREATE_JOB = gql`
  mutation createJob(
    $userId: String!, 
    $jobName: String!, 
    $jobTypeId: String!, 
    $startJob: DateTime,
    $endJob: DateTime,
    $location: String!,
    $guest: Int,
    $detail: String,
    $startBudget: Float!,
    $endBudget: Float!,
    $tel: String!,
    $email: String!,
    $limit: DateTime,
    $displayName: String!,
    $lineEmail: String!
  ){
    createJob(
      userId: $userId,
      jobName: $jobName,
      jobTypeId: $jobTypeId,
      startJob: $startJob,
      endJob: $endJob,
      location: $location,
      guest: $guest,
      detail: $detail,
      startBudget: $startBudget,
      endBudget: $endBudget,
      tel: $tel,
      email: $email,
      limit: $limit,
      displayName: $displayName,
      lineEmail: $lineEmail,
    ){
      id
    }
  }
`

export const SEND_MESSAGE = gql`
  mutation testmsg($userId : String!){
    testmsg(userId: $userId)
  }
`