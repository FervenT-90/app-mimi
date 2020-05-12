import React, { Fragment } from 'react';
import { Link } from 'gatsby';

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => (
   <Fragment>
      <div className="flex flex-col min-h-screen">
         <header className="flex justify-around">
            <Link to="/">LOGO</Link>
            <Link to="/profile">Profile</Link>
            <a href="#">LOGIN/LOGOUT</a>
         </header>
         <main className="flex items-center justify-center flex-1">
            {children}
         </main>
         <footer>
            <nav className="flex justify-around">
               <Link to="dashboard/joinworkout">Join Workout</Link>
               <Link to="dashboard/myworkouts">My Workouts</Link>
               <Link to="dashboard/settings">Settings</Link>
            </nav>
         </footer>
      </div>
   </Fragment>
);

export default Layout;
