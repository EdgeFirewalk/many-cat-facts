import React from 'react';

import styles from './AppLoader.module.scss';

const AppLoader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className={styles.loaderText}>Please wait...</p>
    </div>
  );
};

export default AppLoader;
