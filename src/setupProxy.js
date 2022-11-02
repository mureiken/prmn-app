const { createProxyMiddleware } = require('http-proxy-middleware');
// const morgan = require("morgan");

const proxy = {
    target: 'http://localhost:5000',
    changeOrigin: true
}

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware(proxy)
  );

//   app.use(morgan('combined'));

}