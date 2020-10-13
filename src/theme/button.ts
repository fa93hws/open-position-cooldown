const baseButton = {
  transition: 'opacity 0.3s',
  borderRadius: 'default',
  '&:hover': {
    opacity: 0.7,
  },
};

const primary = {
  ...baseButton,
  fontSize: 2,
  fontWeight: 'bold',
  color: 'background',
  bg: 'primary',
  cursor: 'pointer',
};

export const buttonVariant = {
  primary,
  outline: {
    ...baseButton,
    variant: 'buttons.primary',
    color: 'primary',
    bg: 'transparent',
    boxShadow: 'inset 0 0 2px',
  },
  secondary: {
    ...baseButton,
    variant: 'buttons.primary',
    color: 'background',
    bg: 'secondary',
  },
  primaryIcon: {
    ...primary,
    borderRadius: 'circle',
  },
};
