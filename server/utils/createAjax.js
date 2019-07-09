const axios = require('axios');

const createAjax = () => {
    const ajax = axios.create({
        baseURL: 'https://qyapi.weixin.qq.com/',
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        transformRequest: [data => JSON.stringify(data)],
    });

    ajax.interceptors.response.use(
        response => {
            const {
                errcode,
                errmsg,
            } = response.data;
            if (!errcode) {
                console.log("success");
            } else {
                console.error(errcode, errmsg);
            }
        },
        err => {
            console.error(err);
        },
    );
    return ajax;
}

module.exports = createAjax;