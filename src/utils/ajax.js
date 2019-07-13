import {
  message
} from 'antd';
import createAjax from '#/utils/createAjax'
import Config from '@/config/config'


const handleRedirect = {
  40: () => {
    window.location.replace(Config.Login.Url);
  },
  41: (data) => {
    message.error(data.errmsg || '账号被禁用', () => window.location.replace(Config.Login.Url));
  },
  110004: () => {
    window.location.replace('/#/nopower');
  },
};

const ajax = createAjax(handleRedirect);

export default ajax;
