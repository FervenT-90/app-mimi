import React from 'react';
import { Link } from 'gatsby';

const Header = () => {
   return (
      <div>
         <nav className="flex items-center justify-around">
            <Link to="/" activeClassName="active">
               HOME
            </Link>
            <Link to="/dashboard/profile" activeClassName="active">
               My Profile
            </Link>
            <span>TODO show login status</span>
         </nav>
      </div>
   );
};

export default Header;
