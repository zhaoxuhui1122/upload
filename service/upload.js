/**
 * Created by zhaoxuhui on 2017/7/17.
 */
const Uplaod = require("../mongoose/upload");
const fs = require("fs");
module.exports = {
    //文件上传已完成，此处为将文件的大小、存储路径等基本信息存储到数据库内
    //新增文件
    add: function(req, res) {
        var file = req.file;
        var fileObj = {
            name: file.filename,
            type: file.mimetype.split("/")[1],
            url: '/upload/files/' + file.filename,
            size: (file.size / (1024 * 1024)).toFixed(2) + "Mb",
            createAt: Date.now()
        }
        //先创建一条数据
        var file = new Uplaod(fileObj);
        //再将所需要的数据保存
        file.save(function(err, files) {
            if (err) {
                console.log(err);
                return;
            }
            res.redirect("/");
        })
    },
    //删除文件
    remove: function(req, res) {
        var id = req.body.id;
        var url;//需要删除文件在文件夹内的路径
        Uplaod.find({_id:id},function(err,file){
            if(err){
                console.log(err);
                return ;
            }
            url = file.url ;
        }).then(function(){
            Uplaod.remove({ _id: id }, function(err) {
                if (err) {
                    console.log(err);
                    res.json({ result: "数据库信息删除失败" });
                } else {//数据库删除成功后将文件夹内的文件也删除掉
                    fs.unlink("static"+url,function(error){
                        if(error){
                            console.log(error);
                            res.json({ result: "文件夹内文件删除失败" });
                            return ;
                        }
                        res.json({ result: "success" });
                    })
                }
            })
        })

    }
}