# webpack4

　　版本主要变动

    - 支持零配置
    - 必须通过`mode`或者`--model`选项配置`webpack`运行模式。仅支持`production`（生产环境模式）和`development`（开发环境模式）两种模式。前者注重优化，不支持自动化监听；后者注重版本迭代，支持自动化监听


## 环境搭建

　　确保已经安装了`Node`环境

　　`npm i -g webpack webpack-cli`
　　`npm i --save-dev webpack webpack-cli`

　　全局（局部）安装`webpack`和`webpack-cli`（`webpack4`要求同时安装`webpack`和`webpack-cli`，而`webpack3`仅需要安装`webpack`即可。）

## 打包 JS 模块

### 不配置`webpack.config.js`文件

　　在不配置`webpack.config.js`文件的情况下，可以直接通过`webpack --mode development src/js/entry.js`命令直接将`entry.js`文件及其依赖打包到`dist/main.js`文件中。

*实例*

```javascript

    // src/js/math.js
    function pow(base, exp = 2) {
        return base ** exp;
    }

    function square(base) {
        return pow(base);
    }

    function sqrt(base) {
        return pow(base, 0.5);
    }

    export {pow, sqrt, square};

    // src/js/entry.js
    import * as math from './math';
    import $ from 'jquery';

    // 引入并使用第三方包 jquery
    $('body')
        .append($('<p/>').text('2的平方 --> ' + math.square(2)))
        .append($('<p/>').text('4的开方 --> ' + math.sqrt(4)))
        .append($('<p/>').text('5的4次方 --> ' + math.pow(5, 4)));

```

　　执行`webpack --mode development src/js/entry.js`命令后，将会生成`dist/main.js`文件，将`dist/main.js`文件直接引入到`html`文件中，可以在浏览器中看到具体效果。

### 配置`webpack.config.js`文件











