import React from 'react';
import { Link } from 'gatsby';
import MainLayout from '../layouts/main.jsx';

const Main = () => {
   return (
      <MainLayout>
         <h1>TODO: LOGIN/REGISTRY</h1>
         <p>If you have already an account:</p>
         <Link to="/dashboard">Go to dashboard</Link>
      </MainLayout>
   );
};

export default Main;
