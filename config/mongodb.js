/**
 * Created by zhaoxuhui on 2017/7/17.
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise = require('bluebird');
const colors = require("../config/colors");

module.exports = function() {
    //百度云服务器上
    if(process.env.SERVER_SOFTWARE == 'bae/3.0') {
        var user = "341b3801489b4b279632885bd13b0ef4";//Access Key ID
        var pwd = "1a882272b2d14d1fbc844b5583c8379a";//Secret Access Key
        var database = "YRyzINGQtfFUZthtOJVI";//数据库名称
        var url = 'mongodb://' + user + ':' + pwd + '@mongo.duapp.com:8908/' + database + '';
        //连接数据库
        mongoose.connect(url, {
            server: {
                auto_reconnect: true
            }
        });
        //关闭时尝试自动连接
        mongoose.connection.on('close', function() {
            mongoose.connect(url, {
                server: {
                    auto_reconnect: true
                }
            });
        });
        //连接数据库失败
        mongoose.connection.on('error', function(error) {
            console.log('error + ' + error);
            mongoose.disconnect();
        });

    } else {
        //本地数据库
        var db = mongoose.connect("mongodb://127.0.0.1:27017/smalleyes") //创建数据库连接
        db.connection.on("open", function() {
            console.log(colors.success("connecting:mongodb://127.0.0.1:27017/smalleyes"));
        })
        db.connection.on('error', function(err) {
            console.log(colors.error('数据库连接失败：' + err));
        });
    }
}