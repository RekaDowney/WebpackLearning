const path = require('path');

module.exports = {
    // 指定为开发环境
    mode: "development",
    // 指定入口文件（输入）【绝对路径或者相对路径（以 ./ 或者 ../ 开头）】
    // entry: "./src/js/entry.js",
    entry: path.resolve(__dirname, "./src/js/entry.js"),
    // 指定打包后的文件（输出）
    output: {
        // 指定输出文件名称
        filename: "bundle.js",
        // 指定输出文件所在目录【只能够是绝对路径】
        path: path.resolve(__dirname, 'dist/js'),
    }
};