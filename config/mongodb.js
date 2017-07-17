/**
 * Created by zhaoxuhui on 2017/7/17.
 *
 *定义了mongodbs数据库连接模式
 * 本人测试服务器为百度云的基础版引擎，此处判定如果为线上，服务器连接地址为1，本地为2
 * 设计的具体参数请参按照自己的数据库地址测试
 */

var mongoose = require('mongoose');
mongoose.Promise = global.Promise = require('bluebird');
const colors = require("../config/colors");

module.exports = function() {
    //地址1
    //百度云服务器上
    if (process.env.SERVER_SOFTWARE == 'bae/3.0') {
        var user = "341b3801489b4b279632885bd13b0e**"; //Access Key ID
        var pwd = "1a882272b2d14d1fbc844b5583c8379a"; //Secret Access Key
        var database = "YRyzINGQtfFUZthtOJ**"; //数据库名称
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
        //地址2
        //本地数据库
        var db = mongoose.connect("mongodb://127.0.0.1:27017/upload") //创建数据库连接
        db.connection.on("open", function() {
            console.log(colors.success("connecting:mongodb://127.0.0.1:27017/upload"));
        })
        db.connection.on('error', function(err) {
            console.log(colors.error('数据库连接失败：' + err));
        });
    }
}