require('dotenv').config();
const axios = require('axios');

module.exports = async (query, variables) => {
   const result = await axios({
      url: process.env.FAUNADB_URL,
      method: 'POST',
      headers: {
         Authorization: `Bearer ${process.env.FAUNADB_API_KEY}`,
      },
      data: {
         query,
         variables,
      },
   });

   return result.data;
};
