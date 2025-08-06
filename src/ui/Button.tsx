import React from 'react';

export type ButtonSize = 'sm' | 'md';
export type ButtonColor = 'primary' | 'success' | 'error';

interface ButtonProps {
  size?: ButtonSize;
  color?: ButtonColor;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
}

const buttonStyles = {
  base: {
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer' as const,
    fontWeight: 500,
    display: 'inline-flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    transition: 'all 0.2s',
    color: 'white',
  },
  sizes: {
    sm: {
      padding: '4px 8px',
      fontSize: '12px',
      minWidth: '24px',
      height: '24px',
    },
    md: {
      padding: '8px 16px',
      fontSize: '14px',
      minWidth: '80px',
      height: '36px',
    },
  },
  colors: {
    primary: {
      backgroundColor: '#007bff',
    },
    success: {
      backgroundColor: '#28a745',
    },
    error: {
      backgroundColor: '#dc3545',
    },
  },
  disabled: {
    backgroundColor: '#6c757d',
    cursor: 'not-allowed' as const,
    opacity: 0.6,
  },
  hover: {
    primary: '#0056b3',
    success: '#1e7e34',
    error: '#c82333',
  },
} as const;

export function Button({
  size = 'md',
  color = 'primary',
  onClick,
  disabled = false,
  type = 'button',
  children,
}: ButtonProps) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      style={{
        ...buttonStyles.base,
        ...buttonStyles.sizes[size],
        ...buttonStyles.colors[color],
        ...(disabled ? buttonStyles.disabled : {}),
      }}
      onClick={handleClick}
      disabled={disabled}
      onMouseOver={e => {
        if (!disabled) {
          (e.target as HTMLButtonElement).style.backgroundColor =
            buttonStyles.hover[color];
        }
      }}
      onMouseOut={e => {
        if (!disabled) {
          (e.target as HTMLButtonElement).style.backgroundColor =
            buttonStyles.colors[color].backgroundColor;
        }
      }}
    >
      {children}
    </button>
  );
}
