import gql from 'graphql-tag';
import { DocumentNode } from 'apollo-boost';

export const ADD_USER_WORKOUT_TO_USER: DocumentNode = gql`
   mutation addUserWorkoutToUser(
      $id: ID!
      $netlifyID: ID!
      $stripeID: ID!
      $adminWorkoutID: ID!
      $dayID: ID!
   ) {
      updateUser(
         id: $id
         data: {
            netlifyID: $netlifyID
            stripeID: $stripeID
            active: true
            workouts: {
               create: [
                  {
                     state: BOOKED
                     adminWorkoutID: $adminWorkoutID
                     dayID: $dayID
                  }
               ]
            }
         }
      ) {
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
