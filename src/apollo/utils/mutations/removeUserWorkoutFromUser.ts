import gql from 'graphql-tag';
import { DocumentNode } from 'apollo-boost';

export const REMOVE_USER_WORKOUT_FROM_USER: DocumentNode = gql`
   mutation removeUserWorkoutFromUser(
      $id: ID!
      $netlifyID: ID!
      $stripeID: ID!
      $userWorkoutIdToDisconnect: ID!
   ) {
      updateUser(
         id: $id
         data: {
            netlifyID: $netlifyID
            stripeID: $stripeID
            active: true
            workouts: { disconnect: [$userWorkoutIdToDisconnect] }
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
