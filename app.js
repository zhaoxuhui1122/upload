/**
 * Created by zhaoxuhui on 2017/7/17.
 */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const moment = require("moment");
const ejs = require("ejs");
const port = 18080;
const colors = require("./config/colors");

//Middleware中间件
app.use(express.static("static")); //Express 托管静态文,/css/style.css
app.set("views", "./views"); //设置根目录
app.set("view engine", "ejs"); //设置默认模板
app.locals.moment = require("moment"); //时间格式化插件
app.use(bodyParser.json()); //body-parser
app.use(bodyParser.urlencoded({extended: true}));


//创建数据库连接
const Mongodb = require("./config/mongodb")();
//multer的配置项
const uploadConfig = require("./config/upload");
//分页插件
const pagination = require("./controller/pagination");
//创建数据库
const Upload = require("./mongoose/upload");
//upload service
const uplaodService = require("./service/upload");
//首页
app.get("/",function(req,res){
    Upload.find({},function(err,files){
        if(err){
            console.log(err);
            return ;
        }
        files = files
            .sort("createAt")
            .reverse();
        var result = pagination(req.query,files);//分页
        res.render("upload",{
            result:result
        });
    })
})

//接口
app.post("/upload/file", uploadConfig.single('file'), uplaodService.add); //文件上传
app.post("/remove/file", uploadConfig.single('file'), uplaodService.remove); //文件删除

//server
app.listen(port,function () {
    console.log(colors.success("server is start !",port,new Date().toLocaleString()));
});