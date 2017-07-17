/**
 * Created by zhaoxuhui on 2017/7/17.
 *
 */

const mongoose = require("mongoose");
//定时模式 schemas
//schemas 以键值:值类型的模式定义
var uploadSchemas = new mongoose.Schema({
    name: String,
    url: String,
    type: String,
    size: String,
    createAt: Date
});
//定义模型 model
var Upload = mongoose.model("Upload", uploadSchemas);

module.exports = Upload;