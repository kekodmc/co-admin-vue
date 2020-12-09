import request from './index'
import qs from 'qs'
import {getHeaders,toLogin} from "../base";
import {toast} from "./index";
import store from '../store'

export default function($url,$data={},config) {
    let data={
        url:$url,
        data:$data,
        method:'post',
        headers:getHeaders()
    }
    data.transformRequest = [function (e) {
        return qs.stringify($data)
    }]
    return new Promise((resolve, reject) => {
        request(data).then(res=>{
            switch (res.code) {
                case 200:
                    //success
                    resolve(res)
                    break
                case 400:
                    //fail
                    store.commit('setToast',{type:'error',msg:res.msg})
                    break
                case 401:
                    //login
                    store.commit('setToast',{type:'error',msg:res.msg})
                    toLogin()
                    break
                default:
                    store.commit('setToast',{type:'error',msg:res.msg})
            }
            reject(res)
        })
    })
}
