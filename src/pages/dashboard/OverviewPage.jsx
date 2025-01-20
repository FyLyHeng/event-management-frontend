import React from 'react';
import MainFramLayout from '../MainFramLayout';
import Nav from "../../component/Nav";
import Summary from "../dashboard/Summary";

const OverviewPage = () => {
  console.log("log from OverviewPage")
  return (
    <>
        <Nav />
        <Summary />
    </>
  );
};

export default OverviewPage;
