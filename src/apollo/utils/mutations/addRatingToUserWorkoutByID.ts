import gql from 'graphql-tag';
import { DocumentNode } from 'apollo-boost';

export const ADD_RATING_TO_USER_WORKOUT_BY_ID: DocumentNode = gql`
   mutation addRatingToUserWorkoutById(
      $id: ID!
      $adminWorkoutID: ID!
      $dayID: ID!
      $state: WorkoutStates!
      $rating: Int!
   ) {
      updateUserWorkout(
         id: $id
         data: {
            adminWorkoutID: $adminWorkoutID
            dayID: $dayID
            state: $state
            rating: $rating
         }
      ) {
         _id
         adminWorkoutID
         dayID
         state
         rating
      }
   }
`;
