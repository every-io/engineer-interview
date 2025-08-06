import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const cardStyles = {
  backgroundColor: '#fff',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '16px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.2s ease',
};

export function Card({ children, className, style }: CardProps) {
  const combinedStyles = {
    ...cardStyles,
    ...style,
  };

  return (
    <div
      className={className}
      style={combinedStyles}
      onMouseOver={e => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          '0 4px 8px rgba(0, 0, 0, 0.15)';
      }}
      onMouseOut={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = cardStyles.boxShadow;
      }}
    >
      {children}
    </div>
  );
}
