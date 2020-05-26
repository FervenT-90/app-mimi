import React, { FC } from 'react';
import { Link } from 'gatsby';
import { useIdentityContext } from 'react-netlify-identity';
import myWorkoutsSvg from '../../assets/svgs/myWorkouts.min.svg';
import settingsSvg from '../../assets/svgs/settings.min.svg';
import joinSvg from '../../assets/svgs/join.min.svg';

interface Props {
   location: any;
}

const Footer: FC<Props> = ({ location }) => {
   const identity = useIdentityContext();
   const isLoggedIn = identity && identity.isLoggedIn;

   return identity && isLoggedIn && location.pathname !== '/' ? (
      <div
         id="dashboardFooter"
         className="fixed bottom-0 left-0 right-0 w-screen"
      >
         <nav className="flex items-center justify-around h-16 border-t-4 text-white-mimi bg-black-mimi font-secondary border-orange-mimi">
            <Link
               className="pb-1"
               to="/dashboard/join"
               activeClassName="border-b-2 border-orange-mimi"
            >
               <img src={joinSvg} alt="Join workout icon" />
            </Link>
            <Link
               className="pb-1"
               to="/dashboard/workouts"
               activeClassName="border-b-2 border-orange-mimi"
            >
               <img src={myWorkoutsSvg} alt="My workout icon" />
            </Link>
            <Link
               className="pb-1"
               to="/dashboard/settings"
               activeClassName="border-b-2 border-orange-mimi"
            >
               <img src={settingsSvg} alt="Settings icon" />
            </Link>
         </nav>
      </div>
   ) : (
      <div
         id="homeFooter"
         className="fixed bottom-0 left-0 right-0 flex items-center justify-center h-16 border-t-4 text-white-mimi bg-black-mimi font-secondary border-orange-mimi"
      >
         <p>Made with 💜 by MiMi</p>
      </div>
   );
};

export default Footer;
