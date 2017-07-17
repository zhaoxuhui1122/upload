/**
 * Created by zhaoxuhui on 2017/7/17.
 */
const Uplaod = require("../mongoose/upload");

module.exports = {
    //文件上传已完成，此处为将文件的大小、存储路径等基本信息存储到数据库内
    //新增文件
    add : function(req,res){
        var file = req.file ;
        var fileObj =
            {
                name : file.filename ,
                type : file.mimetype.split("/")[1],
                url : '/upload/files/'+file.filename,
                size :(file.size/(1024*1024)).toFixed(2) + "Mb",
                createAt : Date.now()
            }
        //先创建一条数据
        var file  = new Uplaod(fileObj);
        //再将所需要的数据保存
        file.save(function(err,files){
            if(err){
                console.log(err);
                return false;
            }
            res.redirect("/");
        })
    },
    //删除文件
    remove: function(req,res){
        var id = req.body.id;
        Uplaod.remove({_id:id},function(err){
            if(err){
                console.log(err);
                res.json({result:"fail"});
            }else{
                res.json({result :"success"});
            }
        })
    }
}