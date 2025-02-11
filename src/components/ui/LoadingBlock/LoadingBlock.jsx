import React from 'react';

import styles from './LoadingBlock.module.scss';

const LoadingBlock = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className={styles.loaderText}>Loading cards...</p>
    </div>
  );
};

export default LoadingBlock;
