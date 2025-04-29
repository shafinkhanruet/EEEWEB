'use client';

import React, { createContext, useState, useContext } from 'react';

const NavbarContext = createContext({
  showNavbar: true,
  setShowNavbar: () => {}
});

export const NavbarProvider = ({ children }) => {
  const [showNavbar, setShowNavbar] = useState(true);

  return (
    <NavbarContext.Provider value={{ showNavbar, setShowNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => useContext(NavbarContext);

export default NavbarProvider; 