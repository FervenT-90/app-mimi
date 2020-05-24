require('dotenv').config();
const sendQuery = require('./utils/send-query');

const CREATE_USER = `
mutation createUser($netlifyID: ID!, $stripeID: ID!, $active: Boolean){
    createUser(data: {
      netlifyID: $netlifyID
      stripeID: $stripeID
      active: $active
    }){
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

// eslint-disable-next-line no-unused-vars
export async function handler(event, _context, _callback) {
   const payload = JSON.parse(event.body);
   const user = payload.user;
   const stripeID = Math.floor(Math.random() * 10000000000);

   const { errors } = await sendQuery(CREATE_USER, {
      netlifyID: user.id,
      stripeID,
      active: true,
   });

   if (errors) {
      return {
         statusCode: 500,
         body: JSON.stringify(errors),
      };
   }

   return {
      statusCode: 200,
      body: '{}',
   };
}
