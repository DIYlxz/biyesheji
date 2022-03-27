

module.exports = {
    publicPath: "/",
    //生成构建文件的目录
    outputDir: "dist",
    //相对于构建目录下的静态文件资源目录
    assetsDir: "static",
    //相对于构建目录下的index.html
    indexPath: "index.html",
    //文件名hash方便缓存
    filenameHashing: true,
    lintOnSave: "default",
    productionSourceMap: false,
    //代理
    devServer: {
        hotOnly: true,
        proxy: {
            "/api": {
                target: "http://localhost:8010",
                ws: true,
                pathRewrite: {
                    "^/api": ""
                }
            },
        },
    },
}