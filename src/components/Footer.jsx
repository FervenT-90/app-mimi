import React from 'react';
import { Link } from 'gatsby';

const Footer = () => {
   return (
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
   );
};

export default Footer;
