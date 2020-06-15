import React, { useState } from 'react';

import PropTypes from 'prop-types';

const Mouse = (props: any) => {
  const [mState, setMState] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: any) => {
    setMState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <div style={{ height: '100%' }} onMouseMove={handleMouseMove}>
      {props.render(mState)}
    </div>
  );
};

const renderPropsShow = () => (
  <div style={{ height: '100%' }}>
    <Mouse
      render={({ x, y }: any) => (
        <h1>
          The mouse position is ({x}, {y})
        </h1>
      )}
    />
  </div>
);

export default renderPropsShow;
