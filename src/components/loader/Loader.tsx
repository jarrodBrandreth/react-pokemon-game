import React from 'react';
import { ReactComponent as LoaderIcon } from '../../assets/icons/aperture-outline.svg';
import './loader.css';

interface LoaderProps {
  msg: string;
}

function Loader({ msg }: LoaderProps) {
  return (
    <div className="loader">
      <div className="content">
        <LoaderIcon className="icon" width="36px" />
        <span className="msg">{msg}</span>
      </div>
    </div>
  );
}

export default Loader;
