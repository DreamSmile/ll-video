const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    productionSourceMap: false,
    configureWebpack: (config) => {
        config.plugins.forEach((val) => {
            if (val instanceof HtmlWebpackPlugin) {
                val.options.title = 'LILANZ';
            }
        })
    },
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0',
        port: 8080,
        proxy: {
            '/WXApi': {
                target: 'http://tm.lilanz.com/oa/api/BrandNewsCore.ashx',
                changeOrigin: true,
                 pathRewrite: {
                    '^/WXApi': ''
                  }
            }
        }
    }
}