const { createProxyMiddleware } = require('http-proxy-middleware');
//跨域代理
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://zwp1.top:3000/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    }),
  );
  app.use(
    '/lbs',
    createProxyMiddleware({
      target: 'https://apis.map.qq.com/ws/location/v1/',
      changeOrigin: true,
      pathRewrite: { '^/lbs': '/' },
    }),
  );
};
