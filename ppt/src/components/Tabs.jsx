import React, { useState } from 'react';

export const Tabs = ({ children, defaultValue, value, onValueChange, className = "" }) => {
  const [activeTab, setActiveTab] = useState(value || defaultValue);
  
  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };
  
  // Clone children to pass the active tab value
  const enhancedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        activeTab: value || activeTab,
        onTabChange: handleTabChange,
      });
    }
    return child;
  });
  
  return (
    <div className={className}>
      {enhancedChildren}
    </div>
  );
};

export const TabsList = ({ children, className = "", activeTab, onTabChange }) => {
  // Clone children to pass the active tab value to each trigger
  const enhancedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        activeTab,
        onTabChange,
      });
    }
    return child;
  });
  
  return (
    <div className={`inline-flex items-center justify-center rounded-md bg-gray-800 p-1 ${className}`}>
      {enhancedChildren}
    </div>
  );
};

export const TabsTrigger = ({ children, value, activeTab, onTabChange, disabled = false, className = "" }) => {
  const isActive = activeTab === value;
  
  const handleClick = () => {
    if (!disabled && onTabChange) {
      onTabChange(value);
    }
  };
  
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
      ${isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}
      ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ children, value, activeTab, className = "" }) => {
  if (activeTab !== value) return null;
  
  return (
    <div className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}>
      {children}
    </div>
  );
};