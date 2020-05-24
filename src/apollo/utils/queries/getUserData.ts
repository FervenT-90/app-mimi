import gql from 'graphql-tag';
import { DocumentNode } from 'apollo-boost';

export const GET_USER_DATA: DocumentNode = gql`
   query GetUserData($netlifyID: ID!) {
      userByNetlifyID(netlifyID: $netlifyID) {
         _id
         netlifyID
         stripeID
         active
         workouts {
            data {
               _id
               adminWorkoutID
               dayID
               state
               rating
            }
         }
      }
   }
`;
