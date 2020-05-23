import gql from 'graphql-tag';
import { DocumentNode } from 'apollo-boost';

export const UPDATE_ADMIN_WORKOUT: DocumentNode = gql`
   mutation updateAdminWorkout($id: ID!, $data: AdminWorkoutInput!) {
      updateAdminWorkout(id: $id, data: $data) {
         _id
         startTime
         finishTime
         bookedVacancies
         vacancies
         finished
      }
   }
`;
