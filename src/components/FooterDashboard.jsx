import React from 'react';
import { Link } from 'gatsby';
// eslint-disable-next-line import/no-unresolved
import { useIdentityContext } from 'react-netlify-identity';

const FooterDashboard = () => {
   const identity = useIdentityContext();
   const isLoggedIn = identity && identity.isLoggedIn;

   return (
      identity &&
      isLoggedIn && (
         <div>
            <nav className="flex items-center justify-around">
               <Link to="/dashboard/join" activeClassName="active">
                  Join Workout
               </Link>
               <Link to="/dashboard/workouts" activeClassName="active">
                  My Workouts
               </Link>
               <Link to="/dashboard/settings" activeClassName="active">
                  Settings
               </Link>
            </nav>
         </div>
      )
   );
};

export default FooterDashboard;
