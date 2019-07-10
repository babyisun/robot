import React from 'react';
import { Provider } from 'mobx-react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { LocaleProvider, message } from 'antd';
import 'moment/locale/zh-cn';
import moment from 'moment';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import router from '@/router';
import createRouter from '#/mobx/createRouter';

import stores from './stores';

import './App.scss';

import BasicLayout from '@/pages/BasicLayout';
import Home from '@/pages/Basic/Home';
import Login from '@/pages/Basic/Login';

// eslint-disable-next-line import/extensions
import Page404 from '#/page/404';
import { Panel, MESSAGE } from '#/components/panel';

const NoPower = () => <Panel message={MESSAGE.NOPOWER} />;




const App = () => {
  // 全局设置
  moment.locale('zh-cn');
  message.config({ top: 120 });
  const { Routes } = createRouter(router);
  console.log('router created');
  return (
    <Provider {...stores}>
      <Router>
        <LocaleProvider locale={zhCN}>
          <BasicLayout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              {Routes}
              <Route exact path="/nopower" component={NoPower} />
              <Route component={Page404} />
            </Switch>
          </BasicLayout>
        </LocaleProvider>
      </Router>
    </Provider>
  );
};

export default App;
