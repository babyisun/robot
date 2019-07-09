// 按需加载脚本
// 用法： await loadScript('http://api.map.baidu.com/api?v=3.0&ak=123')

const cache = {};

const loadScript = (url) => {
    if (cache[url]) return cache[url];
    else {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = url;
        document.body.appendChild(script);
        return cache[url] = new Promise(function (resolve, reject) {
            script.onload = function () {
                resolve();
            }
            script.onerror = function () {
                reject();
            }
        })
    }
}

export default loadScript;