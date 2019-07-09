import React from 'react';
import { Layout } from 'antd';
import Config from '@/config/config';
import style from './Footer.scss';

const { Footer } = Layout;

const Foot = () => (
  <Footer className={style.footer}>{Config.Footer}</Footer>
);

export default Foot;
