import React from 'react';

export const RadioGroup = ({ children, value, onValueChange, className = "" }) => {
  // Clone children to pass the active value and the change handler
  const enhancedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        checked: child.props.value === value,
        onChange: () => onValueChange(child.props.value),
      });
    }
    return child;
  });
  
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {enhancedChildren}
    </div>
  );
};

export const RadioGroupItem = ({ id, value, checked, onChange, className = "" }) => {
  return (
    <input
      type="radio"
      id={id}
      value={value}
      checked={checked}
      onChange={onChange}
      className={`h-4 w-4 border-gray-600 text-blue-600 focus:ring-blue-600 ${className}`}
    />
  );
};

export const Label = ({ children, htmlFor, className = "" }) => {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium text-gray-300 ${className}`}>
      {children}
    </label>
  );
};