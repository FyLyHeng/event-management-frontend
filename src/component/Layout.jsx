import React from 'react';
import Header from './Header';
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <div className="pre-footer">
        <Header />
        {children}
      </div>
      <Footer/>
    </>
  );
}

export default Layout;