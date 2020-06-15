import React from 'react';
import moment from 'moment';

const nowTime = () => {
  const timestamp = new Date().valueOf();
  return <span>{moment(timestamp).format('YYYY-MM-DD HH:mm:ss')}</span>;
};

export default nowTime;
