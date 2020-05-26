import React, { FC, MouseEvent, useState, useEffect } from 'react';
import { apolloService } from '../../../services/apolloService';
import { Day } from '../../../apollo/utils/faunaTypes';
import { useMutation } from '@apollo/react-hooks';
import { mutations } from '../../../apollo/utils/mutations/';
import { joinSVGs } from '../../../assets/svgs';
import Load from '../../Load';
import Error from '../../Error';
import Carousel from 'react-slick';
import 'slick-carousel/slick/slick.css';

const initialDay: Day = {
   _id: null,
   month: null,
   name: null,
   number: null,
   adminWorkouts: null,
};

let carouselRef = React.createRef();

export const Join: FC = () => {
   const [currentDay, setcurrentDay] = useState(0);
   const [selectedDay, setselectedDay] = useState<Day>(initialDay);
   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
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
      updateAdminWorkout,
      { loading: updateLoading, error: updateError },
   ] = useMutation(mutations.UPDATE_ADMIN_WORKOUT);

   const [
      addUserWorkoutToUser,
      { loading: addUserWorkoutLoading, error: addUserWorkoutError },
   ] = useMutation(mutations.ADD_USER_WORKOUT_TO_USER);

   const [
      removeUserWorkoutFromUser,
      {
         loading: removeUserWorkoutFromUserLoading,
         error: removeUserWorkoutFromUserError,
      },
   ] = useMutation(mutations.REMOVE_USER_WORKOUT_FROM_USER);

   const [
      deleteUserWorkoutByID,
      {
         loading: deleteUserWorkoutByIDLoading,
         error: deleteUserWorkoutByIDError,
      },
   ] = useMutation(mutations.DELETE_USER_WORKOUT_BY_ID);

   const hasCurrentDayWorkoutBooked = (dayID: string) => {
      let result = false;
      if (user.workouts.data) {
         user.workouts.data.map((userWorkout) => {
            if (userWorkout.dayID === dayID) {
               currentDayWorkoutIdBooked = userWorkout.adminWorkoutID;
               result = true;
            }
         });
      }
      return result;
   };

   useEffect(() => {
      if (carouselRef && carouselRef.slickGoTo) {
         carouselRef.slickGoTo(currentSlideIndex);
      }
      if (joinMonth && joinMonth.days && user && user.workouts.data) {
         setselectedDay(joinMonth.days[currentDay]);
         isDayBooked = hasCurrentDayWorkoutBooked(selectedDay._id);
      }
   }, [joinMonth, selectedDay, user]);

   if (
      monthError ||
      updateError ||
      userError ||
      addUserWorkoutError ||
      removeUserWorkoutFromUserError ||
      deleteUserWorkoutByIDError
   ) {
      // return <p>Upss...{JSON.stringify(Error)}</p>; Preguntar a Raul cuando vuelva de vacas xD
      return <Error />;
   }

   if (
      monthLoading ||
      updateLoading ||
      userLoading ||
      addUserWorkoutLoading ||
      removeUserWorkoutFromUserLoading ||
      deleteUserWorkoutByIDLoading
   ) {
      return <Load />;
   }

   const monthName = joinMonth.monthName;
   const days = joinMonth.days;

   const handleDayClick = (event: MouseEvent) => {
      event.preventDefault();
      const selectedDay = +event.currentTarget.attributes['value'].nodeValue;
      setcurrentDay(selectedDay);

      setCurrentSlideIndex(+event.currentTarget.attributes['value'].nodeValue);
   };

   const getUserWorkoutIdBy = (adminWorkoutID: string): string => {
      let userWorkoutID: string;
      user.workouts.data.map((userWorkout) => {
         if (userWorkout.adminWorkoutID === adminWorkoutID) {
            userWorkoutID = userWorkout._id;
         }
      });
      return userWorkoutID;
   };

   const areAdminWorkoutsLoaded =
      selectedDay &&
      selectedDay.adminWorkouts &&
      selectedDay.adminWorkouts.data;

   let currentDayWorkoutIdBooked: string;
   let isDayBooked = hasCurrentDayWorkoutBooked(selectedDay._id);

   const carouselSettings = {
      dots: false,
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 5,
      arrows: false,
   };

   // TODO: use current day || Finished field of adminWorkout
   const today = 6;
   let isDayPast = selectedDay.number < today;

   return (
      <div className="w-screen mb-24 md:flex md:flex-col md:justify-center md:items-center">
         <Carousel
            className="fixed top-0 flex flex-row items-center w-screen h-20 mt-20 bg-opacity-50 slick-slider bg-black-mimi"
            ref={(carousel) => (carouselRef = carousel)}
            {...carouselSettings}
         >
            {days.map((day, index) => (
               <div
                  className="flex items-center justify-center py-3"
                  key={day._id}
               >
                  <button
                     id={day._id}
                     className="flex flex-col items-center px-6 text-white-mimi text-mimi-shadow font-primary focus:outline-none"
                     key={day._id}
                     value={index}
                     onClick={handleDayClick}
                  >
                     <p>{day.name.substr(0, 3)}</p>
                     <p>{day.number}</p>
                  </button>
               </div>
            ))}
         </Carousel>

         <p className="pt-32 text-5xl text-center text-white-mimi font-primary text-mimi-shadow">
            {monthName}
         </p>
         {/* Preguntar a RAUL como solventar este error */}
         {selectedDay && selectedDay.name && selectedDay.number && (
            <p className="mb-5 text-2xl text-center text-white-mimi font-primary text-mimi-shadow">
               {selectedDay.name} {selectedDay.number}
            </p>
         )}

         {isDayBooked ? (
            // SI estamos en un dia en el que el usuario tiene un workout reservado.
            <div className="mt-10 md:w-screen md:flex md:flex-col md:justify-center md:items-center">
               {areAdminWorkoutsLoaded &&
                  selectedDay.adminWorkouts.data.map((adminWorkout) => {
                     // Si el workout tiene disponibilidad y SI es el que el usuario tiene reservado
                     if (
                        adminWorkout.bookedVacancies < adminWorkout.vacancies &&
                        currentDayWorkoutIdBooked === adminWorkout._id
                     ) {
                        if (isDayPast) {
                           return (
                              <div
                                 key={adminWorkout._id}
                                 className="flex items-center justify-between w-screen p-3 mb-1 bg-opacity-50 text-green-mimi bg-black-mimi md:w-1/2 font-primary"
                              >
                                 <div className="flex items-center">
                                    <img
                                       className="w-5 h-5 mr-2"
                                       src={joinSVGs.workoutTimeDone}
                                       alt="clock"
                                    />
                                    <p>
                                       {adminWorkout.startTime} -{' '}
                                       {adminWorkout.finishTime}
                                    </p>
                                 </div>
                                 <div className="flex items-baseline text-center ">
                                    <p>
                                       {adminWorkout.bookedVacancies}/
                                       {adminWorkout.vacancies}
                                    </p>
                                    <img
                                       className="ml-2"
                                       src={joinSVGs.vacanciesDone}
                                       alt="people"
                                    />
                                 </div>
                                 <div className="text-2xl text-right">
                                    <button className="flex items-center">
                                       <img
                                          src={joinSVGs.doneWorkout}
                                          alt="Join Workout disabled"
                                       />
                                    </button>
                                 </div>
                              </div>
                           );
                        } else {
                           return (
                              <div
                                 key={adminWorkout._id}
                                 className="flex items-center justify-between w-screen p-3 mb-1 bg-opacity-50 text-white-mimi bg-black-mimi md:w-1/2 font-primary"
                              >
                                 <div className="flex items-center ">
                                    <img
                                       className="w-5 h-5 mr-2"
                                       src={joinSVGs.workoutTime}
                                       alt="clock"
                                    />
                                    <p>
                                       {adminWorkout.startTime} -{' '}
                                       {adminWorkout.finishTime}
                                    </p>
                                 </div>
                                 <div className="flex items-baseline text-center ">
                                    <p>
                                       {adminWorkout.bookedVacancies}/
                                       {adminWorkout.vacancies}
                                    </p>
                                    <img
                                       className="ml-2"
                                       src={joinSVGs.vacancies}
                                       alt="people"
                                    />
                                 </div>

                                 <div className="text-2xl text-right">
                                    <button
                                       className="flex items-center"
                                       onClick={() => {
                                          const userWorkoutIdToDisconnect = getUserWorkoutIdBy(
                                             adminWorkout._id
                                          );

                                          // Desconecta el userWorkout del user con la mutacion removeUserWorkoutFromUser
                                          removeUserWorkoutFromUser({
                                             variables: {
                                                id: user._id,
                                                netlifyID: user.netlifyID,
                                                stripeID: user.netlifyID,
                                                userWorkoutIdToDisconnect,
                                             },
                                          });

                                          // Elimina el UserWorkout desconectado
                                          deleteUserWorkoutByID({
                                             variables: {
                                                id: userWorkoutIdToDisconnect,
                                             },
                                          });

                                          updateAdminWorkout({
                                             variables: {
                                                id: adminWorkout._id,
                                                data: {
                                                   startTime:
                                                      adminWorkout.startTime,
                                                   finishTime:
                                                      adminWorkout.finishTime,
                                                   bookedVacancies:
                                                      adminWorkout.bookedVacancies -
                                                      1,
                                                   vacancies:
                                                      adminWorkout.vacancies,
                                                   finished:
                                                      adminWorkout.finished,
                                                },
                                             },
                                          });
                                       }}
                                    >
                                       <img
                                          src={joinSVGs.cancelWorkout}
                                          alt="cancel workout"
                                       />
                                    </button>
                                 </div>
                              </div>
                           );
                        }

                        // Si el workout tiene disponibilidad y NO es el que el usuario tiene reservado
                     } else if (
                        adminWorkout.bookedVacancies < adminWorkout.vacancies &&
                        currentDayWorkoutIdBooked !== adminWorkout._id
                     ) {
                        if (isDayPast) {
                           <div
                              key={adminWorkout._id}
                              className="flex items-center justify-between w-screen p-3 mb-1 bg-opacity-50 text-mimi-disabled bg-black-mimi md:w-1/2 font-primary"
                           >
                              <div className="flex items-center">
                                 <img
                                    className="w-5 h-5 mr-2"
                                    src={joinSVGs.workoutTimeDisabled}
                                    alt="clock"
                                 />
                                 <p>
                                    {adminWorkout.startTime} -{' '}
                                    {adminWorkout.finishTime}
                                 </p>
                              </div>
                              <div className="flex items-baseline text-center ">
                                 <p>
                                    {adminWorkout.bookedVacancies}/
                                    {adminWorkout.vacancies}
                                 </p>
                                 <img
                                    className="ml-2"
                                    src={joinSVGs.vacanciesDisabled}
                                    alt="people"
                                 />
                              </div>
                              <div className="text-2xl text-right">
                                 <button className="flex items-center">
                                    <img
                                       src={joinSVGs.joinWorkoutDisabled}
                                       alt="Join Workout disabled"
                                    />
                                 </button>
                              </div>
                           </div>;
                        } else {
                           return (
                              <div
                                 key={adminWorkout._id}
                                 className="flex items-center justify-between w-screen p-3 mb-1 bg-opacity-50 text-mimi-disabled bg-black-mimi md:w-1/2 font-primary"
                              >
                                 <div className="flex items-center">
                                    <img
                                       className="w-5 h-5 mr-2"
                                       src={joinSVGs.workoutTime}
                                       alt="clock"
                                    />
                                    <p>
                                       {adminWorkout.startTime} -{' '}
                                       {adminWorkout.finishTime}
                                    </p>
                                 </div>
                                 <div className="flex items-baseline text-center ">
                                    <p>
                                       {adminWorkout.bookedVacancies}/
                                       {adminWorkout.vacancies}
                                    </p>
                                    <img
                                       className="ml-2"
                                       src={joinSVGs.vacancies}
                                       alt="people"
                                    />
                                 </div>
                                 <div className="text-2xl text-right">
                                    <button className="flex items-center">
                                       <img
                                          src={joinSVGs.joinWorkoutDisabled}
                                          alt="Join Workout disabled"
                                       />
                                    </button>
                                 </div>
                              </div>
                           );
                        }
                        // Si el workout NO tiene disponibilidad y SI es el que el usuario tiene reservado
                     } else if (
                        adminWorkout.bookedVacancies ===
                           adminWorkout.vacancies &&
                        currentDayWorkoutIdBooked === adminWorkout._id
                     ) {
                        if (isDayPast) {
                           return (
                              <div
                                 key={adminWorkout._id}
                                 className="flex items-center justify-between w-screen p-3 mb-1 bg-opacity-50 text-green-mimi bg-black-mimi md:w-1/2 font-primary"
                              >
                                 <div className="flex items-center">
                                    <img
                                       className="w-5 h-5 mr-2"
                                       src={joinSVGs.workoutTimeDone}
                                       alt="clock"
                                    />
                                    <p>
                                       {adminWorkout.startTime} -{' '}
                                       {adminWorkout.finishTime}
                                    </p>
                                 </div>
                                 <div className="flex items-baseline text-center ">
                                    <p>
                                       {adminWorkout.bookedVacancies}/
                                       {adminWorkout.vacancies}
                                    </p>
                                    <img
                                       className="ml-2"
                                       src={joinSVGs.vacanciesDone}
                                       alt="people"
                                    />
                                 </div>
                                 <div className="text-2xl text-right">
                                    <button className="flex items-center">
                                       <img
                                          src={joinSVGs.doneWorkout}
                                          alt="Join Workout disabled"
                                       />
                                    </button>
                                 </div>
                              </div>
                           );
                        } else {
                           return (
                              <div
                                 key={adminWorkout._id}
                                 className="flex items-center justify-between w-screen p-3 mb-1 bg-opacity-50 text-white-mimi bg-black-mimi md:w-1/2 font-primary"
                              >
                                 <div className="flex items-center ">
                                    <img
                                       className="w-5 h-5 mr-2"
                                       src={joinSVGs.workoutTime}
                                       alt="clock"
                                    />
                                    <p>
                                       {adminWorkout._id}
                                       {adminWorkout.startTime} -{' '}
                                       {adminWorkout.finishTime}
                                    </p>
                                 </div>
                                 <div className="flex items-baseline text-center ">
                                    <p>
                                       {adminWorkout.bookedVacancies}/
                                       {adminWorkout.vacancies}
                                    </p>
                                    <img
                                       className="ml-2"
                                       src={joinSVGs.vacancies}
                                       alt="people"
                                    />
                                 </div>

                                 <div className="text-2xl text-right">
                                    <button
                                       className="flex items-center"
                                       onClick={() => {
                                          const userWorkoutIdToDisconnect = getUserWorkoutIdBy(
                                             adminWorkout._id
                                          );

                                          // Desconecta el userWorkout del user con la mutacion removeUserWorkoutFromUser
                                          removeUserWorkoutFromUser({
                                             variables: {
                                                id: user._id,
                                                netlifyID: user.netlifyID,
                                                stripeID: user.netlifyID,
                                                userWorkoutIdToDisconnect,
                                             },
                                          });

                                          // Elimina el UserWorkout desconectado
                                          deleteUserWorkoutByID({
                                             variables: {
                                                id: userWorkoutIdToDisconnect,
                                             },
                                          });

                                          updateAdminWorkout({
                                             variables: {
                                                id: adminWorkout._id,
                                                data: {
                                                   startTime:
                                                      adminWorkout.startTime,
                                                   finishTime:
                                                      adminWorkout.finishTime,
                                                   bookedVacancies:
                                                      adminWorkout.bookedVacancies -
                                                      1,
                                                   vacancies:
                                                      adminWorkout.vacancies,
                                                   finished:
                                                      adminWorkout.finished,
                                                },
                                             },
                                          });
                                       }}
                                    >
                                       <img
                                          src={joinSVGs.cancelWorkout}
                                          alt="cancel workout"
                                       />
                                    </button>
                                 </div>
                              </div>
                           );
                        }
                     }

                     // Si el workout NO tiene disponibilidad y NO es el que el usuario tiene reservado
                     return (
                        <div
                           key={adminWorkout._id}
                           className="flex items-center justify-between w-screen p-3 mb-1 bg-opacity-50 text-mimi-disabled bg-black-mimi md:w-1/2 font-primary"
                        >
                           <div className="flex items-center ">
                              <img
                                 className="w-5 h-5 mr-2"
                                 src={joinSVGs.workoutTimeDisabled}
                                 alt="clock"
                              />
                              <p>
                                 {adminWorkout.startTime} -{' '}
                                 {adminWorkout.finishTime}
                              </p>
                           </div>
                           <div className="flex items-baseline text-center">
                              <p>
                                 {adminWorkout.bookedVacancies}/
                                 {adminWorkout.vacancies}
                              </p>
                              <img
                                 className="ml-2"
                                 src={joinSVGs.vacanciesDisabled}
                                 alt="vacancies"
                              />
                           </div>
                           <div className="text-2xl text-right">
                              <button className="flex items-center" disabled>
                                 <img
                                    src={joinSVGs.workoutFull}
                                    alt="Workout full"
                                 />
                              </button>
                           </div>
                        </div>
                     );
                  })}
            </div>
         ) : (
            // NO estamos en un día en el que el usuario tiene un workout reservado
            <div className="mt-10">
               {areAdminWorkoutsLoaded &&
                  selectedDay.adminWorkouts.data.map((adminWorkout) => {
                     if (
                        adminWorkout.bookedVacancies < adminWorkout.vacancies
                     ) {
                        // El workout SI tiene disponibilidad
                        if (isDayPast) {
                           return (
                              <div
                                 key={adminWorkout._id}
                                 className="flex items-center justify-between w-screen p-3 mb-1 bg-opacity-50 text-mimi-disabled bg-black-mimi md:w-1/2 font-primary"
                              >
                                 <div className="flex items-center">
                                    <img
                                       className="w-5 h-5 mr-2"
                                       src={joinSVGs.workoutTimeDisabled}
                                       alt="clock"
                                    />
                                    <p>
                                       {adminWorkout.startTime} -{' '}
                                       {adminWorkout.finishTime}
                                    </p>
                                 </div>
                                 <div className="flex items-baseline text-center ">
                                    <p>
                                       {adminWorkout.bookedVacancies}/
                                       {adminWorkout.vacancies}
                                    </p>
                                    <img
                                       className="ml-2"
                                       src={joinSVGs.vacanciesDisabled}
                                       alt="people"
                                    />
                                 </div>
                                 <div className="text-2xl text-right">
                                    <button className="flex items-center">
                                       <img
                                          src={joinSVGs.joinWorkoutDisabled}
                                          alt="Join Workout disabled"
                                       />
                                    </button>
                                 </div>
                              </div>
                           );
                        } else {
                           return (
                              <div
                                 key={adminWorkout._id}
                                 className="flex items-center justify-between w-screen p-3 mb-1 bg-opacity-50 text-white-mimi bg-black-mimi md:w-1/2 font-primary"
                              >
                                 <div className="flex items-center ">
                                    <img
                                       className="w-5 h-5 mr-2"
                                       src={joinSVGs.workoutTime}
                                       alt="clock"
                                    />
                                    <p>
                                       {adminWorkout.startTime} -{' '}
                                       {adminWorkout.finishTime}
                                    </p>
                                 </div>
                                 <div className="flex items-baseline text-center ">
                                    <p>
                                       {adminWorkout.bookedVacancies}/
                                       {adminWorkout.vacancies}
                                    </p>
                                    <img
                                       className="ml-2"
                                       src={joinSVGs.vacancies}
                                       alt="people"
                                    />
                                 </div>
                                 <div className="text-2xl text-right">
                                    <button
                                       className="flex items-center"
                                       onClick={() => {
                                          addUserWorkoutToUser({
                                             variables: {
                                                id: user._id,
                                                netlifyID: user.netlifyID,
                                                stripeID: user.stripeID,
                                                adminWorkoutID:
                                                   adminWorkout._id,
                                                dayID: selectedDay._id,
                                             },
                                          });
                                          updateAdminWorkout({
                                             variables: {
                                                id: adminWorkout._id,
                                                data: {
                                                   startTime:
                                                      adminWorkout.startTime,
                                                   finishTime:
                                                      adminWorkout.finishTime,
                                                   bookedVacancies:
                                                      adminWorkout.bookedVacancies +
                                                      1,
                                                   vacancies:
                                                      adminWorkout.vacancies,
                                                   finished:
                                                      adminWorkout.finished,
                                                },
                                             },
                                          });
                                       }}
                                    >
                                       <img
                                          src={joinSVGs.joinWorkout}
                                          alt="join workout"
                                       />
                                    </button>
                                 </div>
                              </div>
                           );
                        }
                     }

                     // El workout NO tiene disponibilidad
                     return (
                        <div
                           key={adminWorkout._id}
                           className="flex items-center justify-between w-screen p-3 mb-1 bg-opacity-50 text-mimi-disabled bg-black-mimi md:w-1/2 font-primary"
                        >
                           <div className="flex items-center ">
                              <img
                                 className="w-5 h-5 mr-2"
                                 src={joinSVGs.workoutTimeDisabled}
                                 alt="clock"
                              />
                              <p>
                                 {adminWorkout.startTime} -{' '}
                                 {adminWorkout.finishTime}
                              </p>
                           </div>
                           <div className="flex items-baseline text-center">
                              <p>
                                 {adminWorkout.bookedVacancies}/
                                 {adminWorkout.vacancies}
                              </p>
                              <img
                                 className="ml-2"
                                 src={joinSVGs.vacanciesDisabled}
                                 alt="vacancies"
                              />
                           </div>
                           <div className="text-2xl text-right">
                              <button className="flex items-center" disabled>
                                 <img
                                    src={joinSVGs.workoutFull}
                                    alt="Workout full"
                                 />
                              </button>
                           </div>
                        </div>
                     );
                  })}
            </div>
         )}
      </div>
   );
};
