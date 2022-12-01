const { createProxyMiddleware } = require('http-proxy-middleware');
// const morgan = require("morgan");

const proxy = {
    target: 'http://localhost:5000',
    changeOrigin: true
}

const proxy2 = {
  target: 'https://data.unhcr.org',
  changeOrigin: true
}


module.exports = function(app) {
  app.use('/api',createProxyMiddleware(proxy));
  app.use('/api-content',createProxyMiddleware(proxy2));
  //   app.use(morgan('combined'));
}