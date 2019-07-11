/* eslint-disable no-unused-vars */
const proxy = require('http-proxy-middleware');

const me = 'http://127.0.0.1:3009'; // me



const createProxy = (url, name) =>
  proxy(url, {
    target: name,
    changeOrigin: true,
  });

module.exports = app => {
  app.use(
    createProxy('/robot', me),
    createProxy('/ucenter', me),
    createProxy('/task', me),
  );
};
