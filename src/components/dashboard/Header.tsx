import React, { FC } from 'react';
import { Link } from 'gatsby';
import { useIdentityContext } from 'react-netlify-identity';
import brand from '../../assets/svgs/brand.min.svg';
import logo from '../../assets/svgs/logo.min.svg';
import logout from '../../assets/svgs/logout.min.svg';
import profileButton from '../../assets/images/avatar.png';

interface Props {
   showLogin?: () => void;
   location: any;
}

const Header: FC<Props> = ({ showLogin, location }) => {
   const identity = useIdentityContext();
   const isLoggedIn = identity && identity.isLoggedIn;
   const user = identity && identity.user;
   const name = user && user.user_metadata && user.user_metadata.full_name;

   return identity && user && isLoggedIn && location.pathname !== '/' ? (
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-around w-screen h-20 border-b-4 shadow-sm bg-black-mimi border-orange-mimi">
         <Link to="/" activeClassName="active">
            <img className="focus:outline-none" src={logo} alt="iBox Logo" />
         </Link>

         <Link
            className="flex flex-col items-center"
            to="/dashboard/profile"
            activeClassName="underline text-orange-mimi"
         >
            <img
               className="w-10 h-10 focus:outline-none"
               src={profileButton}
               alt="Profile Button"
            />
            <span className="text-white-mimi">{name}</span>
         </Link>

         <button onClick={showLogin}>
            <img
               className="focus:outline-none"
               src={logout}
               alt="Logout Button"
            />
         </button>
      </nav>
   ) : (
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-around w-screen h-20 border-b-4 shadow-sm bg-black-mimi border-orange-mimi">
         <Link to="/" activeClassName="active">
            <img src={brand} alt="iBoxBrand" />
         </Link>
      </nav>
   );
};

export default Header;
