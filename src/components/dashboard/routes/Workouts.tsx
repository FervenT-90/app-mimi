import React, { FC, useState } from 'react';
import { apolloService } from '../../../services/apolloService';
import Load from '../../Load';
import Error from '../../Error';
import {
   AdminWorkout,
   Day,
   UserWorkout,
} from '../../../apollo/utils/faunaTypes';
import { mutations } from '../../../apollo/utils/mutations/';
import { useMutation } from '@apollo/react-hooks';
import ReactModal from 'react-modal';

const initialUserWorkout: UserWorkout = {
   _id: null,
   adminWorkoutID: null,
   dayID: null,
   state: null,
   user: null,
   date: null,
   rating: null,
};

export const Workouts: FC = () => {
   const [showModal, setShowModal] = useState(false);
   const [userWorkoutToUpdate, setUserWorkoutToUpdate] = useState<UserWorkout>(
      initialUserWorkout
   );

   const {
      joinMonth,
      loading: monthLoading,
      error: monthError,
   } = apolloService.getJoinMonthByNumber(6);

   const {
      user,
      loading: userLoading,
      error: userError,
   } = apolloService.getUserData();

   const [
      addRatingToUserWorkout,
      { loading: addRatingLoading, error: addRatingError },
   ] = useMutation(mutations.ADD_RATING_TO_USER_WORKOUT_BY_ID);

   let workoutsToRateCount: number;

   if (monthError || userError || addRatingError) {
      // return <p>Upss...{JSON.stringify(Error)}</p>; Preguntar a Raul cuando vuelva de vacas xD
      return <Error />;
   }

   if (monthLoading || userLoading || addRatingLoading) {
      return <Load />;
   }

   const userWorkouts = user.workouts.data;
   const completedUserWorkouts = userWorkouts.filter(
      (userWorkout) => userWorkout.state === 'COMPLETED'
   );

   const userAdminWorkouts: AdminWorkout[] = [];

   joinMonth.days.forEach((day) => {
      completedUserWorkouts.forEach((completedUserWorkout) => {
         day.adminWorkouts.data.forEach((adminWorkout) => {
            if (completedUserWorkout.adminWorkoutID === adminWorkout._id) {
               userAdminWorkouts.push(adminWorkout);
            }
         });
      });
   });

   const completedWorkoutsDays: Day[] = [];

   joinMonth.days.forEach((day) => {
      completedUserWorkouts.forEach((completedUserWorkout) => {
         if (day._id === completedUserWorkout.dayID) {
            completedWorkoutsDays.push(day);
         }
      });
   });

   const handleClick = (userWorkoutIndex) => {
      setUserWorkoutToUpdate(userWorkouts[userWorkoutIndex]);
      setShowModal(true);
   };

   const handleRateUserWorkout = (newRating: number) => {
      setShowModal(false);
      addRatingToUserWorkout({
         variables: {
            id: userWorkoutToUpdate._id,
            adminWorkoutID: userWorkoutToUpdate.adminWorkoutID,
            dayID: userWorkoutToUpdate.dayID,
            state: 'COMPLETED',
            rating: newRating,
         },
      });
   };

   workoutsToRateCount = completedUserWorkouts.length;
   const rateableWorkouts = [];

   if (workoutsToRateCount > 0) {
      for (let i = 0; i < workoutsToRateCount; i++) {
         if (completedUserWorkouts[i].rating) {
            rateableWorkouts.push(
               <div
                  key={userAdminWorkouts[i]._id}
                  className="flex items-center justify-between w-screen p-3 mb-1 text-white bg-opacity-50 bg-black-mimi md:w-1/2 font-primary"
               >
                  <span className="w-2/6">
                     {completedWorkoutsDays[i].name}{' '}
                     {completedWorkoutsDays[i].number}
                  </span>
                  <span>{userAdminWorkouts[i].startTime}</span>
                  <span className="w-1/6 text-center">
                     {completedUserWorkouts[i].rating}
                  </span>
               </div>
            );
         } else {
            rateableWorkouts.push(
               <div
                  key={userAdminWorkouts[i]._id}
                  className="flex items-center justify-between w-screen p-3 mb-1 text-white bg-opacity-50 bg-black-mimi md:w-1/2 font-primary"
               >
                  <span className="w-2/6">
                     {completedWorkoutsDays[i].name}{' '}
                     {completedWorkoutsDays[i].number}
                  </span>
                  <span>{userAdminWorkouts[i].startTime}</span>
                  <button
                     onClick={() => {
                        handleClick(i);
                     }}
                     className="w-1/6 text-center"
                  >
                     ⭐
                  </button>
               </div>
            );
         }
      }
   }

   return (
      <div className="flex flex-col items-center justify-center flex-1 w-screen">
         <div className="fixed top-0 flex items-center justify-center w-screen h-20 mt-20 bg-opacity-50 bg-black-mimi">
            <h1 className="text-3xl text-white font-primary">
               Mis Entrenamientos
            </h1>
         </div>
         <p className="pt-32 text-5xl text-center text-white font-primary text-mimi-shadow">
            {joinMonth.monthName}
         </p>
         <div className="flex items-center justify-center">
            <ReactModal
               className="flex flex-col items-center justify-center w-5/6 h-56 px-3 mt-48 ml-8 rounded bg-black-mimi"
               isOpen={showModal}
               onRequestClose={() => setShowModal(false)}
            >
               <form
                  onSubmit={(e) => {
                     e.preventDefault();
                     handleRateUserWorkout(+e.currentTarget[0].value);
                  }}
                  action=""
               >
                  <h1 className="mb-2 text-xl text-white font-primary text-mimi-shadow">
                     Valora el esfuero percibido
                  </h1>
                  <h4 className="mb-4 italic text-white font-primary text-mimi-shadow">
                     (1 - 10)
                  </h4>
                  <input
                     className="w-full h-6 font-semibold text-center text-white bg-transparent border-b-2 rounded font-primary border-orange-mimi"
                     type="number"
                     min="1"
                     max="10"
                     placeholder="Mínimo un 7 💪"
                     name="valoracion"
                     id="valoracion"
                  />
                  <div className="flex mt-12 space-x-12">
                     <button
                        onClick={() => setShowModal(false)}
                        className="px-3 py-1 tracking-wider text-white uppercase bg-red-500 rounded font-primary text-mimi-shadow focus:underline focus:outline-none"
                     >
                        Cancelar
                     </button>
                     <button
                        type="submit"
                        className="px-3 py-1 tracking-wider text-white uppercase rounded font-primary text-mimi-shadow bg-green-mimi focus:underline focus:outline-none"
                     >
                        Valorar
                     </button>
                  </div>
               </form>
            </ReactModal>
         </div>
         <div className="mt-10">
            {rateableWorkouts.map((rateableWorkout) => {
               return rateableWorkout;
            })}
         </div>
      </div>
   );
};
