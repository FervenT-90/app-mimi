import React, { FC } from 'react';
import { Link } from 'gatsby';
import { useIdentityContext } from 'react-netlify-identity';

const Footer: FC = () => {
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

export default Footer;
