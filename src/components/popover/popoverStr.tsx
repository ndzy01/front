import React from 'react';
import { Popover } from 'antd';

const popoverStr = (
  text: string,
  num: number = 12,
  content: boolean = false
) => {
  if (text) {
    return text.length <= num ? (
      <span>{text}</span>
    ) : (
      <span>{text.slice(0, num)}...</span>
    );
  } else if (content) {
    return;
  } else {
    return <span>-</span>;
  }
};

export default popoverStr;
