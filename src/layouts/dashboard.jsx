import React, { Fragment } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

// eslint-disable-next-line react/prop-types
const DashboardLayout = ({ children }) => (
   <Fragment>
      <div className="flex flex-col min-h-screen">
         <Header />
         <main className="flex items-center justify-center flex-1">
            {children}
         </main>
         <Footer />
      </div>
   </Fragment>
);

export default DashboardLayout;
