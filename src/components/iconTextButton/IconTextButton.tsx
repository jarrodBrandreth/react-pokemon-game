import React from 'react';
import { SvgComponentAsProps } from '../../types/Types';

interface IconTextButtonProps {
  Icon: SvgComponentAsProps;
  size: string;
  text: string;
  className?: string;
  handler: () => void;
}

function IconTextButton({ Icon, size, text, className = '', handler }: IconTextButtonProps) {
  return (
    <button className={className} onClick={() => handler()}>
      {text}
      <Icon width={size} style={{ marginLeft: '6px' }} />
    </button>
  );
}

export default IconTextButton;
