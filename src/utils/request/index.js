import axios from 'axios'
import {HOST} from "../base";
import VueIziToast from 'vue-izitoast';
export const toast=new VueIziToast({position: "topCenter"})

const request = axios.create({
    baseURL: HOST,
    timeout: 30000,
    responseType: 'json'
})

// request拦截器
request.interceptors.request.use(
    (config) => {
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        return config
    }, (error) => {
        console.log('request error',error)
    }
)

// respone拦截器
request.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return response.data
        } else {
            // return Promise.reject({code:0,msg:'无法连接网络'})
            return {code:0,msg:'无法连接网络'}
        }
    },
    (error) => {
        // return Promise.reject({code:0,msg:'无法连接网络'})
        return {code:0,msg:'无法连接网络'}
    }
)
export default request
