import React, { FC } from 'react';
import { navigate } from 'gatsby';
import { useIdentityContext } from 'react-netlify-identity';

interface Props {
   path: String;
   component: React.FC;
   location: Location;
}

const PrivateRoute: FC<Props> = ({
   component: Component,
   location,
   ...rest
}) => {
   const identity = useIdentityContext();
   const isLoggedIn = identity && identity.isLoggedIn;

   if (!isLoggedIn && location.pathname !== '/dashboard/login') {
      navigate('/dashboard/login', { replace: true });
      return null;
   }

   return <Component {...rest} />;
};

export default PrivateRoute;
