import React from 'react';
import { SvgComponentAsProps } from '../../types/Types';

interface IconButtonProps {
  Icon: SvgComponentAsProps;
  size: string;
  className?: string;
  handler: () => void;
  disabled?: boolean;
}

function IconButton({ Icon, size, className = '', handler, disabled = false }: IconButtonProps) {
  return (
    <button disabled={disabled} className={className} onClick={() => handler()}>
      <Icon className="icon" width={size} />
    </button>
  );
}

export default IconButton;
