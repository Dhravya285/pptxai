import React from 'react';

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`rounded-lg border border-gray-800 bg-gray-900 text-gray-100 shadow ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => {
  return <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
};

export const CardTitle = ({ children, className = "" }) => {
  return <h3 className={`text-2xl font-semibold leading-none tracking-tight text-white ${className}`}>{children}</h3>;
};

export const CardDescription = ({ children, className = "" }) => {
  return <p className={`text-sm text-gray-400 ${className}`}>{children}</p>;
};

export const CardContent = ({ children, className = "" }) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
};

export const CardFooter = ({ children, className = "" }) => {
  return <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>;
};