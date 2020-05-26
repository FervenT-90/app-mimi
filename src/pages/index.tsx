import React, { FC } from 'react';
import { Link } from 'gatsby';
import MainLayout from '../layouts/main';
import startScreen from '../assets/svgs/gettingStarted.min.svg';
import Header from '../components/dashboard/Header';
import Footer from '../components/dashboard/Footer';

const Main = ({ location }) => {
   return (
      <MainLayout>
         <Header location={location} />
         <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="mb-10 text-4xl text-white animation font-primary text-mimi-shadow">
               Bienvenido
            </h1>

            <img src={startScreen} alt="welcome svg" />
            <Link
               className="px-6 py-1 mt-20 font-semibold tracking-wider uppercase rounded shadow text-white-mimi bg-green-mimi focus:outline-none focus:underline"
               to="/dashboard"
            >
               comienza ya
            </Link>
         </div>
         <Footer location={location} />
      </MainLayout>
   );
};

export default Main;
