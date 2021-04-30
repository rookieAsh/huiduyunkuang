import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    hasLogin: false, // 是否登录
    userInfo: {}, // 用户信息
    config: {}, // 配置信息
    token: '',
  },
  // 修改store中的值唯一的方法就是提交mutation来修改
  mutations: {
    /**
     * 设置状态
     * @param {Object} state 状态对象
     * @param {Object} provider 传入值
     */
    // setState(state, provider) {
    // 	console.log(provider)
    // 	state.hasLogin = true
    // 	state.user = provider.user
    // 	state.config = provider.config
    // },
    /**
     * 登录更新状态
     * @param {Object} state 状态对象
     * @param {Object} provider 传入值
     */
    login(state, provider) {
      state.hasLogin = true;
      state.userInfo = provider;
      sessionStorage.setItem('address', provider.address)
      sessionStorage.setItem('userId', provider.userid)
      sessionStorage.setItem('inviteCode', provider.invitationcode)
    },
    setToken(state, provider) {
      state.hasLogin = true;
      sessionStorage.setItem('token', provider.token)
    },
    /**
     * 登出更新状态
     * @param {Object} state 状态对象
     */
    logout(state) {
      state.hasLogin = false
      state.userInfo = {}
      state.config = {}
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('address')
      sessionStorage.removeItem('userId')
      sessionStorage.removeItem('inviteCode')
    },
  },
  actions: {

  }
})
export default store
