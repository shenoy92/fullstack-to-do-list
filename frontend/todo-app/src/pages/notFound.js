import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/notFound.module.scss';

const NotFound = () => {
    return (
        <div className={styles.notFoundContainer}>
          <h1>Page Not Found</h1>
          <p>The page you are looking for, doesn't exist</p>
          <Link to="/"> Go to home page</Link>
        </div>
    );
  }
  
  export default NotFound;
  