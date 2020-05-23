import gql from 'graphql-tag';
import { DocumentNode } from 'apollo-boost';

export const DELETE_USER_WORKOUT_BY_ID: DocumentNode = gql`
   mutation deleteUserWorkoutByID($id: ID!) {
      deleteUserWorkout(id: $id) {
         _id
         dayID
         adminWorkoutID
         rating
         state
      }
   }
`;
