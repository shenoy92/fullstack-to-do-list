import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Auth from "../common/helper/auth";
import FormikCustomInput from "../component/formikCustomInput";
import styles from '../styles/login.module.scss';
import { API_URLS, API_METHODS } from '../common/constants/api';
import { fetchData } from '../common/helper/fetchData';

const Login = (props) => {

  useEffect(() => {
    if(Auth.isAuthenticated()) {
      Auth.login(() => {
        props.history.push('/todo');
      })
    }
  },[]);

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  })

  const onSubmit = (values) => {
    fetchData(API_URLS.signIn, API_METHODS.post, { email: values.email, password: values.password }, null, 'Logged in successfully!!')
    .then((response) => {
      Auth.login(() => {
        props.history.push('/todo');
      },response.data)
    })
  }

    return (
        <div className={styles.loginFormContainer}>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>
              <FormikCustomInput className="todo-input" type='email' name='email'  placeholder="E-mail"/>
              <FormikCustomInput className="todo-input" type='password' name='password' placeholder="Password"/>
              <button className="todo-btn" type='submit'>LOGIN</button>
            </Form>
          </Formik>
          <p>Don't have an account?<Link to="/registration"> Sign up</Link></p>
        </div>
    );
  }
  
  export default Login;
  