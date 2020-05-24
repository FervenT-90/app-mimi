import { useQuery, useMutation } from '@apollo/react-hooks';
import { queries } from '../apollo/utils/queries';
import { mutations } from '../apollo/utils/mutations';

import {
   MonthByNumberArgs,
   GetUserByNetlifyIDArgs,
   User,
   Day,
} from '../apollo/utils/faunaTypes';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import fetch from 'isomorphic-fetch';
import { createHttpLink } from 'apollo-link-http';
import { useIdentityContext } from 'react-netlify-identity';

export type JoinMonth = {
   monthName: string;
   days: Day[];
};

const link = createHttpLink({
   uri: process.env.GATSBY_FAUNADB_URL,
   fetch,
   headers: {
      Authorization: `Bearer ${process.env.GATSBY_FAUNADB_API_KEY}`,
   },
});

const client = new ApolloClient({
   cache: new InMemoryCache(),
   link,
});

const getUserData = () => {
   const identity = useIdentityContext();
   const getUserDataVariable: GetUserByNetlifyIDArgs = {
      netlifyID: identity.user.id,
   };

   const { data, loading, error } = useQuery(queries.GET_USER_DATA, {
      variables: getUserDataVariable,
   });

   if (loading) {
      return { loading: 'loading...' };
   }

   if (error) {
      return { error: JSON.stringify(error) };
   }

   const user: User = data.userByNetlifyID;

   return { user };
};

const getJoinMonthByNumber = (numberOfMonth: number) => {
   const getAdminDataVariable: MonthByNumberArgs = {
      number: numberOfMonth,
   };
   const { data, loading, error } = useQuery(queries.GET_ADMIN_DATA, {
      variables: getAdminDataVariable,
   });

   if (loading) {
      return { loading: 'loading...' };
   }
   if (error) {
      return { error: JSON.stringify(error) };
   }

   const monthName: string = data.monthByNumber.name;
   const days: Day[] = data.monthByNumber.days.data;

   const monthResult: JoinMonth = {
      monthName,
      days,
   };

   return { joinMonth: monthResult };
};

export const updateBookedVacanciesByOne = () => {
   const [
      updateBookedVacanciesByOne,
      { loading, error, data: updatedAdminWorkout },
   ] = useMutation(mutations.UPDATE_ADMIN_WORKOUT);

   return [updateBookedVacanciesByOne, { loading, error, updatedAdminWorkout }];
};

export const apolloService = {
   getUserData,
   getJoinMonthByNumber,
   updateBookedVacanciesByOne,
   client,
};
