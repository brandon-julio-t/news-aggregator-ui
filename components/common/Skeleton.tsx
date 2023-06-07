import React, { ComponentProps, ComponentType } from 'react';

const Skeleton: ComponentType<ComponentProps<'div'>> = ({ className, ...rest }) => {
  return <div {...rest} className={`animate-pulse rounded-box bg-gray-400 ${className}`}></div>;
};

export default Skeleton;
