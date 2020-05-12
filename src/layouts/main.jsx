import React, { Fragment } from 'react';

// eslint-disable-next-line react/prop-types
const MainLayout = ({ children }) => (
   <Fragment>
      <div className="flex flex-col min-h-screen">
         <header className="flex justify-around"></header>
         <main className="flex items-center justify-center flex-1">
            {children}
         </main>
      </div>
   </Fragment>
);

export default MainLayout;
