import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { Router } from '@reach/router';
import MainLayout from '../layouts/main';
import Header from '../components/dashboard/Header';
import PrivateRoute from '../components/PrivateRoute';
import Load from '../components/Load';
import {
   Join,
   Workouts,
   Profile,
   Settings,
   Login,
} from '../components/dashboard/routes/index';

import IdentityModal from 'react-netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css';

import Footer from '../components/dashboard/Footer';

const Dashboard = ({ location }) => {
   const [isDialogVisible, setIsDialogVisible] = useState(false);
   const showLogin = () => setIsDialogVisible(true);

   useEffect(() => {
      if (location.pathname.match(/^\/dashboard\/?$/)) {
         navigate('/dashboard/login', { replace: true });
      }
   }, []);
   return (
      <MainLayout>
         <div className="flex flex-col max-h-screen">
            <Header showLogin={showLogin} />
            <div className="flex flex-1 w-screen pt-20">
               <Router>
                  <PrivateRoute path="dashboard/join" component={Join} />
                  <PrivateRoute path="dashboard/profile" component={Profile} />
                  <PrivateRoute path="dashboard/workouts" component={Load} />
                  <PrivateRoute
                     path="dashboard/settings"
                     component={Settings}
                  />
                  <Login path="dashboard/login" showLogin={showLogin} />
               </Router>
            </div>
            <Footer />
            <IdentityModal
               showDialog={isDialogVisible}
               onCloseDialog={() => setIsDialogVisible(false)}
               aria-label="Login"
            />
         </div>
      </MainLayout>
   );
};

export default Dashboard;
