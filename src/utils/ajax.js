import {
  message
} from 'antd';
import createAjax from '#/utils/createAjax'
import Config from '@/config/config'


const handleRedirect = {
  110003: () => {
    window.location.replace(Config.Login.Url);
  },
  110023: (data) => {
    message.error(data.errmsg || '异常，请重新登录！', () => window.location.replace(Config.Login.Url));
  },
  110004: () => {
    window.location.replace('/#/nopower');
  },
};

const ajax = createAjax(handleRedirect);

export default ajax;
