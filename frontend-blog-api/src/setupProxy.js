const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function proxyFunction(app) {
	const target = process.env.BACKEND_URL || "http://localhost:5000";
	app.use(
		"/",
		createProxyMiddleware({
			target,
			changeOrigin: true,
		}),
	);
};
