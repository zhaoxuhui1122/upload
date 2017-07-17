/**
 * Created by zhaoxuhui on 2017/7/17.
 */
const moment = require("moment");
const multer = require("multer");
var multerConfig= {
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './static/upload')
        },
        filename: function(req, file, cb) {
            cb(null, moment(Date.now()).format('YYYYMMDDHHmmss') +"."+  file.originalname.split(".")[file.originalname.split(".").length-1]);
        }
    }),
    limits: {
        files : 1 ,
        fieldSize : "5"

    }
}
var upload = multer({ storage: multerConfig.storage ,limits : multerConfig.limits})

module.exports = upload ;