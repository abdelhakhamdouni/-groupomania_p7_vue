import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userLogged: false,
  posts:[],
  lastPosts: [],
  user: {},
  profile: {},
  post: null
};

const getters = {
  isUserLogged : () =>{
    return state.userLogged
  }, 
  getPosts: ()=>{
    return state.posts
  },
  getLastPosts: ()=>{
    return state.lastPosts
  },
  getPost: ()=>{
    return state.post
  },
  getLogedUser: ()=>{
    return state.user
  },
  getProfile: ()=>{
    return state.profile
  }
};

const mutations = {
  LOG_USER: (state, bool) => {
    state.userLogged = bool || true
  },
  SET_POSTS: (state, posts) => {
    state.posts = posts
  },
  SET_LAST_POSTS: (state, posts) => {
    state.lastPosts = posts
  },
  SET_POST: (state, post) => {
    state.post = post
  },
  SET_USER_DATA: (state, user)=>{
    state.user = user
  },
  SET_PROFILE: (state, profile)=>{
    state.profile = profile
  }
};

const actions = {
  logUser : ({commit}, bool) =>{
    commit("LOG_USER", bool)
  },
   setPosts: ({commit}, posts) => {
     commit("SET_POSTS", posts)
   },
   setLastPosts: ({commit}, posts) => {
    commit("SET_LAST_POSTS", posts)
  },
  setPost: ({commit}, post) => {
    commit("SET_POST", post)
  },
  setUserData: ({commit}, user)=>{
    commit('SET_USER_DATA', user)
  },
  setProfile: ({commit,}, profile)=>{
    commit('SET_PROFILE', profile)
  }
};


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {}
})
