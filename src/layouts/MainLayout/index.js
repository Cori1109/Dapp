import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar';

const MainLayout = ({ children }) => {
  return (
    <div>
      <div >{children}</div>
      <NavBar />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;
 