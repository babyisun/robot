// curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=7ced3ef6-aea1-48de-a49b-817bc2a44bad' 
// -H 'Content-Type: application/json' 
// -d '
// {
//     "msgtype": "text",
//     "text": {
//         "content": "开站会啦~~",
//         "mentioned_list":["wangqing","@all"],
//     }
// }'

// const axios = require('axios');
const moment = require('moment');
const createAjax = require('./utils/createAjax');
const ajax = createAjax();


setInterval(() => {
    //请求数据
    var post_data = {
        // "key": "7ced3ef6-aea1-48de-a49b-817bc2a44bad",
        "msgtype": "text",
        "text": {
            "content": "当前时间：" + moment().format('YYYY-MM-DD HH:mm:ss'),
            // "mentioned_list": ["wangqing", "@all"],
        }
    };
    ajax.post("/cgi-bin/webhook/send?key=7ced3ef6-aea1-48de-a49b-817bc2a44bad", post_data);
}, 3000);

// axios.post("https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=7ced3ef6-aea1-48de-a49b-817bc2a44bad", {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     data: JSON.stringify(post_data)
// });