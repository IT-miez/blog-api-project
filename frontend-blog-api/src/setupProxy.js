const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function proxyFunction(app) {
	const target = process.env.BACKEND_URL || "https://blog-api-backend-g3af.onrender.com";
	app.use(
		"/",
		createProxyMiddleware({
			target,
			changeOrigin: true,
		}),
	);
};
