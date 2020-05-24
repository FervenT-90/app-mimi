export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
   ID: string;
   String: string;
   Boolean: boolean;
   Int: number;
   Float: number;
};

export enum WorkoutStates {
   Booked = 'BOOKED',
   Canceled = 'CANCELED',
   Completed = 'COMPLETED',
}

export type User = {
   _id: Scalars['ID'];
   __typename?: 'User';
   netlifyID: Scalars['ID'];
   stripeID: Scalars['ID'];
   active?: Maybe<Scalars['Boolean']>;
   workouts: Maybe<UserWorkoutPage>;
};

export type UserWorkoutPage = {
   __typename?: 'UserWorkoutPage';
   data: Array<Maybe<UserWorkout>>;
   after: Scalars['String'];
   before: Scalars['String'];
};

export type UserWorkout = {
   _id: Scalars['ID'];
   __typename?: 'UserWorkout';
   state: WorkoutStates;
   rating?: Maybe<Scalars['Int']>;
   date?: Maybe<Scalars['Int']>;
   user: User;
   adminWorkoutID: Scalars['ID'];
   dayID: Scalars['ID'];
};

export type Year = {
   __typename?: 'Year';
   number: Scalars['Int'];
   months?: Maybe<Array<Month>>;
};

export type Month = {
   __typename?: 'Month';
   name: Scalars['String'];
   number: Scalars['Int'];
   year: Year;
   days?: Maybe<DayPage>;
};

export type DayPage = {
   __typename?: 'DayPage';
   data: Array<Maybe<Day>>;
   after: Scalars['String'];
   before: Scalars['String'];
};

export type Day = {
   _id: Scalars['ID'];
   __typename?: 'Day';
   name: Scalars['String'];
   number: Scalars['Int'];
   month: Month;
   adminWorkouts: Maybe<AdminWorkoutPage>;
};

export type AdminWorkoutPage = {
   __typename?: 'AdminWorkoutPage';
   data: Array<Maybe<AdminWorkout>>;
   after: Scalars['String'];
   before: Scalars['String'];
};

export type AdminWorkout = {
   _id: Scalars['ID'];
   __typename?: 'AdminWorkout';
   startTime: Scalars['String'];
   finishTime: Scalars['String'];
   bookedVacancies: Scalars['Int'];
   vacancies: Scalars['Int'];
   finished: Scalars['Boolean'];
   day: Day;
   date?: Maybe<Scalars['Int']>;
};

export type AdminWorkoutInput = {
   startTime: Scalars['String'];
   finishTime: Scalars['String'];
   bookedVacancies: Scalars['Int'];
   vacancies: Scalars['Int'];
   finished: Scalars['Boolean'];
};

export type Query = {
   __typename?: 'Query';
   monthByNumber: Month;
};

export type MonthByNumberArgs = {
   number: Scalars['Int'];
};

export type GetUserByNetlifyIDArgs = {
   netlifyID: Scalars['ID'];
};

export type UpdateBookedVacanciesByOneArgs = {
   id: Scalars['ID'];
   data: AdminWorkoutInput;
};
