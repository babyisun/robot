/* eslint-disable no-unused-vars */
const proxy = require('http-proxy-middleware');

const me = 'http://127.0.0.1:8080'; // me



const createProxy = (url, name) =>
  proxy(url, {
    target: name,
    changeOrigin: true,
  });

module.exports = app => {
  app.use(
    createProxy('/common', me),
  );
};
