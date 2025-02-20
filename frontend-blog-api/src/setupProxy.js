import { createProxyMiddleware } from 'http-proxy-middleware';
import { fetchURL } from '../constants/fetchURL';

export function proxyFunction(app) {
    const target = fetchURL;
    app.use(
        '/',
        createProxyMiddleware({
            target,
            changeOrigin: true,
        })
    );
};
