/**
 * Created by zhaoxuhui on 2017/7/17.
 */
$(function() {
    //弹框
    $(".add").click(function() {
        $('.modal input').val("");
        $('.modal textarea').val("");
        $(".modal").fadeIn(50);
    })
    //关闭
    $(".close").click(function() {
        $(this).parents('.modal').fadeOut(30);
    })
})
// 扩展插件
// 分页

$.fn.extend({
    pagination: function() {
        var that = $(this);
        var total = parseInt($("#total").val());
        var pageNum = parseInt($("#pageNum").val());
        var totalPageNum = parseInt($("#totalPageNum").val());
        var hasPrev = $("#hasPrev").val();
        var hasNext = $("#hasNext").val();
        //生成页码
        //页码小于10页时
        if (totalPageNum > 1 && totalPageNum <= 10) {
            $('<li class="prev">上一页</li>').appendTo(that.find("ul"));
            for (var i = 0; i < totalPageNum; i++) {
                $('<li class="pageNumber">' + (i + 1) + '</li>').appendTo(that.find("ul"));
            }
            $('<li class="next">下一页</li>').appendTo(that.find("ul"));
        }
        if (totalPageNum > 10) {
            $('<li class="prev">上一页</li>').appendTo(that.find("ul"));
            for (var i = (totalPageNum - 10); i < totalPageNum; i++) {
                $('<li class="pageNumber">' + (i + 1) + '</li>').appendTo(that.find("ul"));
            }
            $('<li class="next">下一页</li>').appendTo(that.find("ul"));
        }
        // 上一页
        that.find(".prev").click(function() {
            if (hasPrev == "true") {
                that.find('form').find('input[name="pageNum"]').val(pageNum - 1);
                that.find('form').submit();
            }
        })

        // 下一页
        that.find('.next').click(function() {
            if (hasNext == "true") {
                that.find('form').find('input[name="pageNum"]').val(pageNum + 1);
                that.find('form').submit();
            }
        })
        // 点击分页按钮
        that.find('.pageNumber').click(function() {
            var _pageNum = parseInt($(this).html());
            that.find('form').find('input[name="pageNum"]').val(_pageNum);
            that.find('form').submit();
        })
    }
})

$(function() {
    $(".pagination").each(function() {
        $(this).pagination();
    });
})