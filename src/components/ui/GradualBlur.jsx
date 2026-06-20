import React from 'react';
import './GradualBlur.css';

const GradualBlur = ({ 
  position = 'top', 
  strength = 3, 
  height = '8rem',
  className = '' 
}) => {
  const positionClasses = {
    top: 'gradual-blur-top',
    bottom: 'gradual-blur-bottom',
    left: 'gradual-blur-left',
    right: 'gradual-blur-right'
  };

  const blurClass = positionClasses[position] || positionClasses.top;
  
  const style = {
    '--blur-strength': strength,
    '--blur-height': height
  };

  return (
    <div 
      className={`gradual-blur ${blurClass} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

export default GradualBlur;