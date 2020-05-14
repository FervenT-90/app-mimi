import React, { Fragment } from 'react';
import { IdentityContextProvider } from 'react-netlify-identity-widget';

// eslint-disable-next-line react/prop-types
const MainLayout = ({ children }) => (
   <IdentityContextProvider url="https://app-ihealthybox.netlify.app">
      <Fragment>
         <div className="flex flex-col min-h-screen">
            <main>{children}</main>
         </div>
      </Fragment>
   </IdentityContextProvider>
);

export default MainLayout;
