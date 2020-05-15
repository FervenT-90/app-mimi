import React, { FC } from 'react';
import { IdentityContextProvider } from 'react-netlify-identity-widget';

const MainLayout: FC = ({ children }) => (
   <IdentityContextProvider url="https://app-ihealthybox.netlify.app">
      <div className="flex flex-col min-h-screen">
         <main>{children}</main>
      </div>
   </IdentityContextProvider>
);

export default MainLayout;
