// DashboardWrapper.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Dashboard from './Dashboard';

const DashboardWrapper = () => {
  const { idForage } = useParams();
  
  return <Dashboard idForage={parseInt(idForage)} />;
};

export default DashboardWrapper;