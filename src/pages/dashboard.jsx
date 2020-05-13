import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import { Router } from '@reach/router';
import DashboardLayout from '../layouts/dashboard.jsx';
import RouteJoin from '../components/RouteJoin.jsx';
import RouteWorkouts from '../components/RouteWorkouts.jsx';
import RouteProfile from '../components/RouteProfile.jsx';
import RouteSettings from '../components/RouteSettings.jsx';

// eslint-disable-next-line react/prop-types
const Dashboard = ({ location }) => {
   useEffect(() => {
      // eslint-disable-next-line react/prop-types
      if (location.pathname.match(/^\/dashboard\/?$/)) {
         navigate('/', { replace: true });
      }
   }, []);
   return (
      <DashboardLayout>
         <h1>DASHBOARD</h1>
         <Router>
            <RouteJoin path="dashboard/join" />
            <RouteProfile path="dashboard/profile" />
            <RouteWorkouts path="dashboard/workouts" />
            <RouteSettings path="dashboard/settings" />
         </Router>
      </DashboardLayout>
   );
};

export default Dashboard;
