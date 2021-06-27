const axios = require('axios');
const {
  weibo
} = require('./config/index');
const https = require('https');
const rootCas = require('ssl-root-cas').create();
const path = require('path');

rootCas.addFile(path.resolve(__dirname, '../intermediate.pem'));
const httpsAgent = new https.Agent({
  ca: rootCas
});
// https.globalAgent.options.ca = rootCas;


const Referer = 'https://api.weibo.com/chat/';
const Cookie = `SUB=${weibo.SUB};BAYEUX_BROWSER=${weibo.BAYEUX_BROWSER}`;
axios.defaults.headers.common['Referer'] = Referer;
axios.defaults.headers.common['Cookie'] = Cookie;
axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36'
axios.defaults.httpsAgent = httpsAgent;
module.exports = axios;