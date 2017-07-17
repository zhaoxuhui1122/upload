/**
 * Created by zhaoxuhui on 2017/7/17.
 *
 */

const mongoose = require("mongoose");
//定义模式 schemas
//schemas 所需存储的字段以 键值:值类型的模式定义
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