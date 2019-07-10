import axios from 'axios';
import qs from 'qs';
import {
    message
} from 'antd';

// 外部处理业务逻辑，需在父层添加响应的code处理
/* const handleRedirect = {
  110003: () => {
    window.location.replace('/admin/#/login');
  },
  110023: () => {
    message.error('您的账号被禁用，请重新登录！', () => window.location.replace('/admin/#/login'));
  },
  110004: () => {
    window.location.replace('/admin/#/nopower');
  },
}; */

const createAjax = (handleRedirect) => {
    const ajax = axios.create({
        baseURL: '/',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        transformRequest: [data => qs.stringify(data)],
    });

    ajax.interceptors.response.use(
        response => {
            const {
                errno,
                errmsg,
                data
            } = response.data;
            console.log(response.data, response);
            // 接口正常，返回 { errno, errmsg, data }
            if (response.status >= 200 && response.status < 300) {
                // 接口错误，404、500 等，返回错误
                if (errno === 0) {
                    console.log('yes');

                    return {
                        success: true,
                        data,
                    };
                }
                if (handleRedirect && handleRedirect[errno]) {
                    return handleRedirect[errno]({ errno, errmsg, data });
                }
                return message.error(errmsg || '接口错误');
            }
            return null;
        },
        err => {
            if (err.response) {
                const code = err.response.status;
                if (code >= 500) {
                    message.error('服务器打盹了~');
                }
            }
            return {
                error: err,
            };
        },
    );
    return ajax;
}

export default createAjax;