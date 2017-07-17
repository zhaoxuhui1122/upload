/**
 * Created by zhaoxuhui on 2017/7/17.
 */
/**
 * 分页插件参数
 * @param pageSize {Number} 每页条数
 * @param pageNum {Number} 总页码
 * @param total {Number} 总条数
 * @param curNum {dict} 当前页码
 * @param hasPrev {boolean} 是否有上一页
 * @param hasNext {boolean} 是否有下一页
 * @param data {object} 数据列表
 */
module.exports = function(params, list) {
    var pageSize = parseInt(params.pageSize) || 12;
    var pageNum = parseInt(params.pageNum) || 1;
    var total = list.length;
    var hasPrev = true;
    var hasNext = true;
    var data = [];
    //分割list
    for (var i = 0, len = list.length; i < len; i += pageSize) {
        data.push(list.slice(i, i + pageSize));
    }
    var totalPageNum = data.length;
    //判断是否有上／下一页
    if (pageNum <= 1) {
        pageNum = 1;
        hasPrev = false;
        hasNext = true;
    }
    if (pageNum >= totalPageNum) {
        pageNum = totalPageNum;
        hasPrev = true;
        hasNext = false;
    }
    if (totalPageNum == 1) {
        hasPrev = false;
        hasNext = false;
    }
    var result = {
        total: total,
        pageNum: pageNum,
        totalPageNum: totalPageNum,
        hasPrev: hasPrev,
        hasNext: hasNext,
        items: data[pageNum - 1]
    }
    return result;
}