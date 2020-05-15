import React, { FC } from 'react';
import { Link } from 'gatsby';
import { useIdentityContext } from 'react-netlify-identity';
import brand from '../../assets/svgs/brand.min.svg';
import logo from '../../assets/svgs/logo.min.svg';
import logout from '../../assets/svgs/logout.min.svg';
import profileButton from '../../assets/svgs/ProfileButton.min.svg';

interface Props {
   showLogin: () => void;
}

const Header: FC<Props> = ({ showLogin }) => {
   const identity = useIdentityContext();
   const isLoggedIn = identity && identity.isLoggedIn;
   const user = identity && identity.user;
   const name = user && user.user_metadata && user.user_metadata.full_name;

   return identity && user && isLoggedIn ? (
      <nav className="flex items-center justify-around h-20 border-b-4 shadow-sm bg-black-mimi border-orange-mimi">
         <Link to="/" activeClassName="active">
            <img className="focus:outline-none" src={logo} alt="iBoxLogo" />
         </Link>
         <div className="flex flex-col items-center">
            <Link to="/dashboard/profile" activeClassName="active">
               <img className="focus:outline-none" src={profileButton} alt="" />
            </Link>
            <span className="text-white">{name}</span>
         </div>
         <button onClick={showLogin}>
            <img className="focus:outline-none" src={logout} alt="" />
         </button>
      </nav>
   ) : (
      <nav className="flex items-center justify-around h-20 border-b-4 shadow-sm bg-black-mimi border-orange-mimi">
         <Link to="/" activeClassName="active">
            <img src={brand} alt="iBoxBrand" />
         </Link>
      </nav>
   );
};

export default Header;
