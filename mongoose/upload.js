/**
 * Created by zhaoxuhui on 2017/7/17.
 */
const mongoose = require("mongoose");

var uploadSchemas = new mongoose.Schema({
    name: String,
    url :String,
    type : String,
    size : String,
    createAt: Date
});

var Upload = mongoose.model("File", uploadSchemas);

module.exports = Upload;