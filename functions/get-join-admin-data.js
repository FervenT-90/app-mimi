require('dotenv').config();
const sendQuery = require('./utils/send-query');

const number = 6;

const GET_JOIN_ADMIN_DATA = `
   query($number: Int!) {
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
                     vacancies
                     finished
                  }
               }
            }
         }
      }
   }
`;

exports.handler = async () => {
   const { data, errors } = await sendQuery(GET_JOIN_ADMIN_DATA, {
      number,
   });

   if (errors) {
      return {
         statusCode: 500,
         body: JSON.stringify(errors),
      };
   }

   return {
      statusCode: 200,
      body: JSON.stringify({ joinAdminData: data.monthByNumber }),
   };
};
