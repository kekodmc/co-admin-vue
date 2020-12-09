import {Message} from 'element-ui'
import request from './index'
import {getHeaders,toLogin} from "../base";
import store from '../store'

export default function(url,$file,$config) {
    let form = new FormData() // 创建form对象
    form.append($config.data.name, $file, $file.name)// 通过append向form对象添加数据
    if($config.data){
        for (let key in $config.data) {
            form.append(key,$config.data[key])
        }
    }
    let data={
        url:url,
        data:form,
        method:'post',
        headers:getHeaders(true)
    }
    //上传进度
    if ($config.onUploadProgress) {
        data.onUploadProgress=(progressEvent)=> {
            // {percent: (progressEvent.loaded / progressEvent.total * 100 | 0)}
            $config.onUploadProgress(progressEvent)
        }
    }
    return new Promise((resolve, reject) => {
        request(data,$config).then(res=>{
            switch (res.code) {
                case 200:
                    //success
                    resolve(res)
                    break
                case 400:
                    //fail
                    store.commit('setToast',{type:'error',msg:res.msg})
                    reject(res)
                    break
                case 401:
                    //login
                    store.commit('setToast',{type:'error',msg:res.msg})
                    toLogin()
                    break
            }
            reject(res)
        })
    })
}
