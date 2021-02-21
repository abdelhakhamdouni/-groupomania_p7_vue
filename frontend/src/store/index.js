import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userLogged: false,
  posts:[],
  user: {}
};

const getters = {
  isUserLogged : () =>{
    return state.userLogged
  }, 
  getPosts: ()=>{
    return state.posts
  },
  getLogedUser: ()=>{
    return state.user
  }
};

const mutations = {
  LOG_USER: (state, bool) => {
    state.userLogged = bool || true
  },
  SET_POSTS: (state, posts) => {
    state.posts = posts
  },
  SET_USER_DATA: (state, user)=>{
    state.user = user
  }
};

const actions = {
  logUser : ({commit}, bool) =>{
    commit("LOG_USER", bool)
  },
   setPosts: ({commit}, posts) => {
     commit("SET_POSTS", posts)
   },
  setUserData: ({commit}, user)=>{
    commit('SET_USER_DATA', user)
  }
};


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {}
})
