import React from 'react';
import DashboardLayout from '../layouts/dashboard.jsx';
import RouteJoin from '../components/RouteJoin.jsx';
import RouteWorkouts from '../components/RouteWorkouts.jsx';
import RouteProfile from '../components/RouteProfile.jsx';
import RouteSettings from '../components/RouteSettings.jsx';
import { Router } from '@reach/router';

const Dashboard = () => {
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
