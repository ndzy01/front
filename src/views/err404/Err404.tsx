import React from 'react';
import styles from './err404.module.scss';

export default function Err404() {
  return (
    <div className={styles.err404}>
      <div className={styles.body}>
        <p>很抱歉您访问的页面不存在!!!</p>
      </div>
    </div>
  );
}
