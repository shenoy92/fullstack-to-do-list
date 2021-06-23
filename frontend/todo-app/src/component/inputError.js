import React from 'react';
import styles from '../styles/error.module.scss';

const InputError = (props) => {
    return <div className={styles.error}>{props.children}</div>
  }
  
  export default InputError;
  