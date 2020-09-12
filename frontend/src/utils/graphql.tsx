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
  query jobTypes {
    jobTypes {
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
    $startJob: DateTime!,
    $endJob: DateTime!,
    $location: String!,
    $guest: Int,
    $detail: String,
    $startBudget: Float!,
    $endBudget: Float!,
    $tel: String!,
    $email: String,
    $limit: DateTime!,
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
      lineEmail: $lineEmail
    )
  }
`

export const FIND_JOB_MAPPING = gql`
  query findJobMapping(
    $jobId: String!,
    $photographerId: String!
  ){
    findJobMapping(
      jobId: $jobId,
      photographerId: $photographerId
    )
  }
`

// export const FIND_PHOTOGRAPHER = gql`
//   query findPhotographerJobs(
//     $userId: String!,
//   ){
//     findPhotographerJobs(
//       userId: $userId,
//     )
//   }
// `

// export const FIND_CUSTOMER = gql`
//   query findCustomer(
//     $userId: String!,
//   ){
//     findCustomer(
//       userId: $userId,
//     )
//   }
// `

export const CREATE_JOB_MAPPING = gql`
  mutation createJobMapping(
    $jobId: String!,
    $photographerId: String!,
    $price: Float!
  ){
    createJobMapping(
      jobId: $jobId,
      photographerId: $photographerId,
      price: $price
    )
  }
`

export const CUSTOMER_CONFIRM_JOB = gql`
  query customerConfirmJob(
    $jobId: String!,
    $photographerId: String!,
  ){
    customerConfirmJob(
      jobId: $jobId,
      photographerId: $photographerId,
    )
  }
`

export const PHOTOGRAPHER_CONFIRM_JOB = gql`
  query photographerConfirmJob(
    $jobId: String!,
    $photographerId: String!,
  ){
    photographerConfirmJob(
      jobId: $jobId,
      photographerId: $photographerId,
    )
  }
`

export const PHOTOGRAPHER_CANCEL_JOB = gql`
  query photographerCancelJob(
    $jobId: String!,
    $photographerId: String!,
  ){
    photographerCancelJob(
      jobId: $jobId,
      photographerId: $photographerId,
    )
  }
`

export const SEND_MESSAGE = gql`
  mutation testmsg($userId : String!){
    testmsg(userId: $userId)
  }
`