const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function proxyFunction(app) {
	const target = import.meta.env.VITE_BACKEND_URL || "localhost:5000";
	app.use(
		"/",
		createProxyMiddleware({
			target,
			changeOrigin: true,
		}),
	);
};
