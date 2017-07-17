/**
 * Created by zhaoxuhui on 2017/7/17.
 * multer 文件上传控件
 * moment 时间格式化插件
 */
const moment = require("moment");
const multer = require("multer");
var multerConfig = {
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './static/upload')
        },
        filename: function(req, file, cb) { //重新定义文件名，以年月日时分秒加问价后缀构成，例如20170717182445.jpg
            cb(null, moment(Date.now()).format('YYYYMMDDHHmmss') + "." + file.originalname.split(".")[file.originalname.split(".").length - 1]);
        }
    }),
    limits: { //限定
        files: 1,
        fieldSize: "5"

    }
}
//上传配置
var upload = multer({ storage: multerConfig.storage, limits: multerConfig.limits });

module.exports = upload;