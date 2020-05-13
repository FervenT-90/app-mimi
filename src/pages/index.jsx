import React from 'react';
import { Link } from 'gatsby';
import MainLayout from '../layouts/main.jsx';

const Main = () => {
   return (
      <MainLayout>
         <div>
            <p>TODO: Step by Step to get started</p>
            <Link to="/dashboard">Let&apos;s start!</Link>
         </div>
      </MainLayout>
   );
};

export default Main;
