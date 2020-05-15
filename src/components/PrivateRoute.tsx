import React, { FC, FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { navigate } from 'gatsby';
import { useIdentityContext } from 'react-netlify-identity';

interface Props extends RouteComponentProps {
   component: FunctionComponent;
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
