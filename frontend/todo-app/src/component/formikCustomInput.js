import React from 'react';
import { Field, ErrorMessage } from 'formik';

import styles from '../styles/formikCustomInput.module.scss';
import InputError from "./inputError";

const FormikCustomInput = (props) => {
    return (
        <div className={styles.formControl}>
            <Field {...props}/>
            <ErrorMessage name={props.name} component={InputError}/>
        </div>
      )
  }
  
  export default FormikCustomInput;
  