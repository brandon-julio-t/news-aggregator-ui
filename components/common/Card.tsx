import React, { ComponentProps, ComponentType } from 'react';

interface ICard {
  compact?: boolean;
}

const Card: ComponentType<ComponentProps<'div'> & ICard> = ({ compact, className, children, ...rest }) => {
  return (
    <div className={`card shadow hover:shadow-md transition-all ${compact && 'card-compact'} ${className}`} {...rest}>
      <div className={`card-body`}>{children}</div>
    </div>
  );
};

export default Card;
