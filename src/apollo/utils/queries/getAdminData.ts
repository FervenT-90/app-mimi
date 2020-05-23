import gql from 'graphql-tag';
import { DocumentNode } from 'apollo-boost';

export const GET_ADMIN_DATA: DocumentNode = gql`
   query GetAdminData($number: Int!) {
      monthByNumber(number: $number) {
         _id
         name
         number
         year {
            number
         }
         days {
            data {
               _id
               number
               name
               adminWorkouts {
                  data {
                     _id
                     startTime
                     finishTime
                     bookedVacancies
                     vacancies
                     finished
                  }
               }
            }
         }
      }
   }
`;
