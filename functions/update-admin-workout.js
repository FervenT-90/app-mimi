require('dotenv').config();
const sendQuery = require('./utils/send-query');

const UPDATE_ADMIN_WORKOUT_BOOKED_VACANCIES = `
mutation updateBookedVacancies($id:ID!, $data: AdminWorkoutInput!){
    updateAdminWorkout(id:$id, data: $data){
      startTime
      finishTime
      bookedVacancies
      vacancies
      finished
    }
  }
`;

exports.handler = async () => {
   const { data, errors } = await sendQuery(
      UPDATE_ADMIN_WORKOUT_BOOKED_VACANCIES,
      {
         id: 266054233536594443,
         data: {
            startTime: '09:00',
            finishTime: '10:00',
            bookedVacancies: 1,
            vacancies: 8,
            finished: false,
         },
      }
   );

   if (errors) {
      return {
         statusCode: 500,
         body: JSON.stringify(errors),
      };
   }

   return {
      statusCode: 200,
      body: JSON.stringify({ joinAdminData: data.updateAdminWorkout }),
   };
};
