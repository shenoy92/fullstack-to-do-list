import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Auth from "../common/helper/auth";
import styles from '../styles/login.module.scss';
import FormikCustomInput from "../component/formikCustomInput";
import { API_URLS, API_METHODS } from '../common/constants/api';
import { fetchData } from '../common/helper/fetchData';

const Registration = (props) => {
  useEffect(() => {
    if(Auth.isAuthenticated()) {
      Auth.login(() => {
        props.history.push('/todo');
      })
    }
  },[]);

  const initialValues = {
    userName: '',
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    userName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  })

  const onSubmit = (values) => {
    fetchData(API_URLS.registration, API_METHODS.post, 
              { name: values.userName, email: values.email, password: values.password }, null,
              'Account created successfully!!')
    .then((response) => {
      Auth.login(() => {
        props.history.push('/todo');
      },response.data.authToken)
    })
  }

    return (
      <div className={styles.loginFormContainer}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>
              <FormikCustomInput className="todo-input" type='userName' name='userName'  placeholder="Username"/>
              <FormikCustomInput className="todo-input" type='email' name='email'  placeholder="E-mail"/>
              <FormikCustomInput className="todo-input" type='password' name='password' placeholder="Password"/>
              <button className="todo-btn" type='submit'>REGISTER</button>
            </Form>
        </Formik>
        <p>You already have an account?<Link to="/"> Login In</Link></p>
      </div>
    );
  }
  
  export default Registration;
  