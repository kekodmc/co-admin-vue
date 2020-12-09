import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 定义初始值
let state = {
    dark:'',
    menuList:[],
    toast:{},
}

const mutations = {
    setDark (state, value) {
        state.dark = value
    },
    setMenuList(state, value){
        state.menuList = value
    },
    setToast(state,value){
        state.toast=value
    },
}
// 事件触发后的逻辑操作
// 参数为事件函数
const actions = {

}

// 返回改变后的数值
const getters = {

}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
