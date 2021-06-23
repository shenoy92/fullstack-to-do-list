import React from 'react';
import styles from '../styles/loading.module.scss';
import LoadingImg from '../assests/images/loading.gif';

const Loading = () => {
    return (
        <div className={styles.loadingTextContainer}>
            <img alt="loader" src={LoadingImg}/>
        </div>
    );
  }
  
  export default Loading;
  