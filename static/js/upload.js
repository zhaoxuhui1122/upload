/**
 * Created by zhaoxuhui on 2017/7/17.
 */
$(function() {
    //判定一下，如果问选定文件，不上传
    $(".submit").click(function() {
        if ($(this).attr("type") == "button") {
            alert("请选择要上传的文件！")
        }
    })
    //选定文件后
    $("#file").change(function() {
        var file = this.files[0];
        if (file) {
            $(".submit").attr("type", "submit");
        }
    });
    //删除
    $(".delete").click(function() {
        var id = $(this).attr('id');
        var tr = $(this).parents('tr');
        if (confirm("是否删除")) {
            $.ajax({
                type: "POST",
                url: "/remove/file",
                data: {
                    id: id
                },
                success: function(res) {
                    if (res.result == "success") {
                        tr.remove();
                    } else {
                        alert("删除失败");
                    }
                }
            })
        }
    })
})