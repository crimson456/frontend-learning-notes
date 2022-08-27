const path = require("path");

//用于module.rules中解析类似json的对象文件为js对象
const toml = require("toml");
const yaml = require("yamljs");
const json5 = require("json5");

//引入HtmlWebpackPlugin插件，用于生成dist目录中的默认模板
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

    //入口(相对路径)
    entry: {
        index: './src/index.js',
        print: './src/print.js',
    },
    // entry字段:
    // 1. 字符串、字符串数组形式，以main作为entryChunkName
    // 2. 对象形式，成员为字符串、字符串数组形式，以成员名作为entryChunkName
    // 3. 对象形式，成员为chunk描述符对象
    //     chunk描述符对象成员：
    //     - dependOn 当前入口所依赖的入口名(entryChunkName)
    //     - filename 当前入口的导出包名(优先级高于output字段中的filename字段)
    //        - filename中可用 [name]、[ext]、[hash]   
    //     - import 启动时需加载的文件路径
    //     - library 以当前入口打包一个库
    //        - name 库名
    //        - type 库的暴露方式
    //
    //     - runtime 运行时 chunk 的名字 ？
    //     - publicPath 当该入口的输出文件在浏览器中被引用时为它们指定一个公共 URL 地址 ？


    //出口
    output: {
        //输出文件名
        filename: "main.js",
        //输出目录(绝对路径)
        path: path.resolve(__dirname, "dist"),
        //每次构建时先清除输出的目录
        clean: true,
    },

    //    //多入口多出口
    //    entry: {
    //        index: './src/index.js',
    //        print: './src/print.js',
    //    },
    //    output: {
    //        filename: '[name].bundle.js',
    //        path: path.resolve(__dirname, 'dist'),
    //    },

    //  ???  //context: path.resolve(__dirname, 'app'),

    module: {
        rules: [
            // 加载css文件
            {
                test: /\.css$/i,
                //注意loader的加载顺序为从右到左，从后到前
                use: ["style-loader", "css-loader"],
            },
            //加载图片
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",

            },
            //加载字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },

            //加载CSV、TSV(数据文件)
            {
                test: /\.(csv|tsv)$/i,
                use: ["csv-loader"],
            },
            //加载XML文件(数据文件)
            {
                test: /\.xml$/i,
                use: ["xml-loader"],
            },

            //加载类似json的对象文件toml、yaml、json5加载为js对象
            {
                test: /\.toml$/i,
                type: "json",
                parser: {
                    parse: toml.parse,
                },
            },
            {
                test: /\.yaml$/i,
                type: "json",
                parser: {
                    parse: yaml.parse,
                },
            },
            {
                test: /\.json5$/i,
                type: "json",
                parser: {
                    parse: json5.parse,
                },
            },
        ],
    },

    //添加HtmlWebpackPlugin插件，用于生成dist目录中的默认模板
    plugins: [
        new HtmlWebpackPlugin({
            title: "管理输出",
        }),
    ],

    //开启source map代码错误追踪
    devtool: 'inline-source-map',

    //使用 webpack-dev-server
    devServer: {
        static: './dist',
    },
    //???多个入口添加,使重复依赖的文件只会加载一次
    optimization: {
        runtimeChunk: 'single',
    },

    //设置模式：可选值有'development'、'production'(默认)、'none'
    mode: "production",
};