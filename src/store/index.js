import Vue from 'vue'
import Vuex from 'vuex'

//安装插件
Vue.use(Vuex)
// 创建插件

const store = new Vuex.Store({
  state: {
    carList: []
  },
  mutations: {
    addCount(state, payload) {
      payload.count++;
    },
    addToCart(state, payload) {
      payload.count = 1;
      payload.isChecked = true;
      state.carList.push(payload);
    }

  },
  actions: {

    addCart(context, payload) {
      let oldProduct = context.state.carList.find(item => item.iid === payload.iid);
      if (oldProduct) {
        context.commit("addCount", oldProduct);

      } else {
        context.commit('addToCart', payload);
      }
    }
  },
  getters: {
    cartLength(state) {
      return state.carList.length;
    },
    carList(state) {
      return state.carList;
    }
  }
})
export default store
