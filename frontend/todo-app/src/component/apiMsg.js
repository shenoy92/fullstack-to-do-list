import React from 'react';
import styles from '../styles/apiMsg.module.scss';

const ApiMsg = (props) => {
    return <div className={`${styles.msgWrapper} ${props.error ? styles.error : ''}`}>
      {props.error ? props.error : props.message}
    </div>
  }
  
export default ApiMsg;
  