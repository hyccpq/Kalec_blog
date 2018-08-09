/**
 * 格式化ctx.body
 * @param code 返回码
 * @param msg	返回信息
 * @param data 返回数据
 * @return
 */

export const resData = (code, msg, data) => {
    return {
        status: code,
        msg: msg,
        data: data
    }
}

// 格式化时间
export const formatDate = (strTime,type) => {
    let date = new Date(strTime);
    if (type === 1){
        return date.Format("yyyy-MM-dd hh:mm:ss")
    } else {
        return date.Format("yyyy-MM-dd")
    }
}

Date.prototype.Format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o){
    	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    
    return fmt;
}