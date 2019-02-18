/* eslint no-extend-native: ["error", { "exceptions": ["Number"] }] */
import axios from 'axios'
import qs from 'qs'

axios.defaults.withCredentials = true

let request
if (process.server) {
    request = ({ url, method, params = {}, timeout = 60000 }) => {
        let options = {
            method: method || 'POST',
            url: 'http://localhost:3012/ums/baike/' + url.replace('/api/', ''),
            responseType: 'json',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Cookie' : 'bk_token=f84fccea-1ada-4cd7-b71a-01a073842272;' // 假设cookie已经生成了，直接set就可以
            },
            timeout,
            withCredentials: true
        }
        if (options.method === 'POST') {
            options.data = qs.stringify(params)
            // options.data = params
        } else {
            options.params = params
        }
        return axios(options).then((res) => {
            // console.log(res)
            return checkStatus(res)
        }).catch((error) => {
            console.log('收到retCode错误：', error)
            return error
        })
        function checkStatus(res) {
            if (!(res.status === 200 || res.status === 304 || res.status === 400) || !res.data) {
                return Promise.reject(res.data)
            }
            return Promise.resolve(res.data)
        }
    }    
} else {
    request = ({ url, method, params = {}, timeout = 60000 }) => {
        let options = {
            method: method || 'POST',
            url,
            responseType: 'json',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            timeout,
            withCredentials: true
        }
        if (options.method === 'POST') {
            options.data = qs.stringify(params)
            // options.data = params
        } else {
            options.params = params
        }
        console.log('url:', url)
        return axios(options).then((res) => {
            return checkStatus(res)
        }).catch((error) => {
            console.log('收到retCode错误：', error)
            return error
        })
        function checkStatus(res) {
            if (!(res.status === 200 || res.status === 304 || res.status === 400) || !res.data) {
                return Promise.reject(res.data)
            }
            return Promise.resolve(res.data)
        }
    }    
}


export {
    request
}