import React from 'react';

const Textarea = ({ 
  className = "", 
  placeholder, 
  value, 
  onChange,
  ...props 
}) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default Textarea;