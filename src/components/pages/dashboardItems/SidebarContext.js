// SidebarContext.js
import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState('Home');
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleOptionClick = (option) => setSelectedOption(option);
  const toggleSidebar = () => setSidebarVisible((prev) => !prev);

  return (
    <SidebarContext.Provider
      value={{
        selectedOption,
        sidebarVisible,
        handleOptionClick,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
