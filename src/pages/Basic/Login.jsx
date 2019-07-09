/* eslint-disable no-underscore-dangle */
import React from 'react';
import Config from '@/config/config';
import LoginPage from '@/pages/Login';
import styles from './Login.scss';

const Login = () => (
  <LoginPage
    platform="NIT-SFZW|NjI4"
    loginUrl="/#/login"
    register
    header={
      <>
        <div className={styles.logoContainer}>
          <div className="logo" />
          <div className="content">
            <div className="desc">{Config.Web.Title}</div>
            <div className="tag">{Config.Web.Version}</div>
          </div>
        </div>
      </>
    }
  />
);

export default Login;
