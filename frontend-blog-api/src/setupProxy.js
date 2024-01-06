const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function proxyFunction(app) {
  app.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    }),
  );
};
