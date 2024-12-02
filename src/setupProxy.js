const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/java-api',
        createProxyMiddleware({
            //35.200.242.24:8080
            target: '35.200.242.24:8080/',
            changeOrigin: true,
        })
    )
}
