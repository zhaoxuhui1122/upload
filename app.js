/**
 * Created by zhaoxuhui on 2017/7/17.
 */
//加载模块
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const moment = require("moment");
const ejs = require("ejs");
const port = 18080;
const colors = require("./config/colors");

//Middleware中间件
app.use(express.static("static")); //托管静态文
app.set("views", "./views"); //设置页面模版根目录
app.set("view engine", "ejs"); //设置默认模板引擎
app.locals.moment = require("moment"); //时间格式化插件
app.use(bodyParser.json()); //body-parser
app.use(bodyParser.urlencoded({ extended: true }));


//创建数据库连接
const Mongodb = require("./config/mongodb")();
//multer的配置项
const uploadConfig = require("./config/upload");
//分页插件
const pagination = require("./controller/pagination");
//创建数据库
const Upload = require("./mongoose/upload");
//提供的sservice方法
const uplaodService = require("./service/upload");
//路由配置  请求首页
app.get("/", function(req, res) {
    //限查出数据库内所有的数据
    Upload.find({}, function(err, files) {
        if (err) {
            console.log(err);
            return;
        }
        //按创建时间排序
        files = files
            .sort("createAt")
            .reverse();
        //分页 调用分页插件
        var result = pagination(req.query, files);
        //响应对应的页面
        res.render("upload", {
            result: result
        });
    })
})

//接口
app.post("/upload/file", uploadConfig.single('file'), uplaodService.add); //文件上传
app.post("/remove/file", uploadConfig.single('file'), uplaodService.remove); //文件删除

//server
app.listen(port, function() {
    console.log(colors.success("server is start !", port, new Date().toLocaleString()));
});