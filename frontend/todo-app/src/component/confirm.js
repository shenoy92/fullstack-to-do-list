import React from 'react';
import styles from '../styles/confirm.module.scss';

const Confirm = (props) => {
    return (
        <div className={styles.confirmContainer}>
            <div className={styles.confirmationPopUp}>
                <p>{props.message}</p>
                <div className={styles.confirmActionWrapper}>
                    <button className={styles.confirm} onClick={() => props.onConfirm(true)}>Yes</button>
                    <button onClick={() => props.onConfirm(false)}>No</button>
                </div>
            </div>
        </div>
    );
  }
  
  export default Confirm;
  