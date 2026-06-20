import React from 'react';
import './StarBorder.css';

const StarBorder = ({
  children,
  as: Component = 'button',
  ...props
}) => {
  return (
    <Component className="star-border-container" {...props}>
      <div className="inner-content">{children}</div>
      <div className="border-gradient-top"></div>
      <div className="border-gradient-bottom"></div>
    </Component>
  );
};

export default StarBorder;