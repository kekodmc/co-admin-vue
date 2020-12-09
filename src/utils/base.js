import md5 from 'js-md5'
import sha1 from 'js-sha1'

export const HOST=process.env.VUE_APP_BASE_URL
export const TOKEN='show_token'
//设置头文件配置
export function getHeaders(upload=false) {
    let token=getToken()
    let headers_config={
        "Token": token,
    };
    if(upload){
        headers_config['Content-Type']='multipart/form-data'
    }
    return headers_config
}
//格式化日期
export function dateFormat (fmt,date) {
    if(!date){
        date=new Date()
    }
    let o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "H+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//获取随机数
export function getToken() {
    let token = window.localStorage.getItem(TOKEN)
    if(token&&token!=='undefined'){
        return token
    }
    return ''
}
export function setToken(token) {
    window.localStorage.setItem(TOKEN,token)
}
//密码加密
export function getPassword(password) {
    return sha1(TOKEN+password)
}
//跳转登录
export function toLogin() {
    window.location.hash='/login'
}
//数组去重
export function removeRepeatArray(arr) {
    // return Array.from(new Set([...arr, ...b]))
    let result = []
    let obj = {}

    for (let i of arr) {
        if (!obj[i]) {
            result.push(i)
            obj[i] = 1
        }
    }
    return result
}
//获取数据
export function getData(key,toJson) {
    let data = window.localStorage.getItem(key)
    if(data&&data!=='undefined'){
        return toJson?JSON.parse(data):data
    }
    return ''
}
//设置数据
export function setData(key,value) {
    window.localStorage.setItem(key,value)
}

//计算表格高度
export function countTableHeight() {
    let h = document.body.clientHeight||document.documentElement.clientHeight||window.innerHeight
    let reduceH=48+64+24+47+36+30
    return h-reduceH
}
