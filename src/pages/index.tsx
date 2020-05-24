import React, { FC } from 'react';
import { Link } from 'gatsby';
import MainLayout from '../layouts/main';
import startScreen from '../assets/svgs/startScreen.min.svg';
import Header from '../components/dashboard/Header';
import Footer from '../components/dashboard/Footer';
const Main: FC = () => {
   return (
      <MainLayout>
         <Header />
         <div className="flex flex-col items-center justify-center h-screen -mt-24">
            <h1 className="mb-10 text-4xl text-white animation font-primary text-mimi-shadow">
               Bienvenido
            </h1>

            <img src={startScreen} alt="welcome svg" />
            <Link
               className="px-6 py-1 mt-20 font-semibold tracking-wider text-white uppercase rounded shadow bg-green-mimi focus:outline-none focus:underline"
               to="/dashboard"
            >
               comienza ya
            </Link>
         </div>
         <Footer />
      </MainLayout>
   );
};

export default Main;
