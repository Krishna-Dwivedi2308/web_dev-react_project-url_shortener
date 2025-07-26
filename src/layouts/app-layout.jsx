import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/Header';

const AppLayout = () => {
  return (
    <div>
      <main classname="m-10 p-10">
        <Header />
        <Outlet />
        //body
      </main>
      //footer
    </div>
  );
};

export default AppLayout;
