import React from 'react';
import { Link } from 'gatsby';
// eslint-disable-next-line import/no-unresolved
import { useIdentityContext } from 'react-netlify-identity';

// eslint-disable-next-line react/prop-types
const HeaderDashboard = ({ showLogin }) => {
   const identity = useIdentityContext();
   const isLoggedIn = identity && identity.isLoggedIn;
   const user = identity && identity.user;
   const name = user && user.user_metadata && user.user_metadata.full_name;

   return identity && user && isLoggedIn ? (
      <nav className="flex items-center justify-around">
         <Link to="/" activeClassName="active">
            HOME
         </Link>
         <Link to="/dashboard/profile" activeClassName="active">
            My Profile
         </Link>
         <button onClick={showLogin}>LogOut</button>
         <span>Hellow {name}!!! </span>
      </nav>
   ) : (
      <nav className="flex items-center justify-around">
         <Link to="/" activeClassName="active">
            HOME
         </Link>
      </nav>
   );
};

export default HeaderDashboard;
