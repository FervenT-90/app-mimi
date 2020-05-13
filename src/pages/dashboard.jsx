import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { Router } from '@reach/router';
import MainLayout from '../layouts/main.jsx';
import HeaderDashboard from '../components/HeaderDashboard.jsx';
import FooterDashboard from '../components/FooterDashboard.jsx';
import PrivateRoute from '../components/PrivateRoute.jsx';
import RouteJoin from '../components/RouteJoin.jsx';
import RouteWorkouts from '../components/RouteWorkouts.jsx';
import RouteProfile from '../components/RouteProfile.jsx';
import RouteSettings from '../components/RouteSettings.jsx';
import RouteLogin from '../components/RouteLogin.jsx';
import IdentityModal from 'react-netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css';

// eslint-disable-next-line react/prop-types
const Dashboard = ({ location }) => {
   const [isDialogVisible, setIsDialogVisible] = useState(false);
   const showLogin = () => setIsDialogVisible(true);

   useEffect(() => {
      // eslint-disable-next-line react/prop-types
      if (location.pathname.match(/^\/dashboard\/?$/)) {
         navigate('/dashboard/login', { replace: true });
      }
   }, []);
   return (
      <MainLayout>
         <div className="flex flex-col min-h-screen">
            <HeaderDashboard showLogin={showLogin} />
            <div className="flex items-center justify-center flex-1">
               <Router>
                  <PrivateRoute path="dashboard/join" component={RouteJoin} />
                  <PrivateRoute
                     path="dashboard/profile"
                     component={RouteProfile}
                  />
                  <PrivateRoute
                     path="dashboard/workouts"
                     component={RouteWorkouts}
                  />
                  <PrivateRoute
                     path="dashboard/settings"
                     component={RouteSettings}
                  />
                  <RouteLogin path="dashboard/login" showLogin={showLogin} />
               </Router>
            </div>
            <FooterDashboard />
            <IdentityModal
               showDialog={isDialogVisible}
               onCloseDialog={() => setIsDialogVisible(false)}
            />
         </div>
      </MainLayout>
   );
};

export default Dashboard;
