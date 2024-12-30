// SidebarContext.js
import React, { createContext, useState, useContext } from 'react';

// Create context
const SidebarContext = createContext();

// Provide context
export const SidebarProvider = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => setSidebarVisible((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isSidebarVisible, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Hook for consuming the context
export const useSidebar = () => useContext(SidebarContext);
