import React from 'react';
import {APP_VERSION} from '../const';

const Version = () => {
  return (
    <div style={{position: 'fixed', right: 10, top: 10, zIndex: 2, color: '#fff'}}>
      v{APP_VERSION}
    </div>
  );
};

export default Version;
