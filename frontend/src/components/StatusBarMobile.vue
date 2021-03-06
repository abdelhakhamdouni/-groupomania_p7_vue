<template>
      <nav class="navbar">
        <router-link class="navbar-brand" to="/"><img src="@/assets/logos/icon.svg" class="img-fluid" alt=""></router-link>
        <router-link class="nav-link" to="/"><span class="fas fa-home fa-3x" ></span></router-link>
        <router-link class="nav-link" to="/membres" ><span class="fa fa-users fa-3x"></span></router-link>
        <router-link class="nav-link" to="/derniers"><span class="far fa-comments fa-3x"></span></router-link>
        <button class="nav-link nav-button" @click="logout"><span class="fa fa-sign-out-alt fa-3x"></span></button>
        <router-link class="navbar-brand"  :to="`/profile/${getLogedUser.id}`"><img  :src="getLogedUser.avatar" alt=""></router-link>
      </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

  computed: {
    ...mapGetters(["getLogedUser"])
  },
  methods:{
    logout: function (){
      let confirmation = window.confirm('Voulez-vous vraiment vous déconnecter ? ')
      confirmation ? this.$router.push({name:'Logout'}) : null
    },
      showUser: function (){
        const userListWrapper = document.querySelector('.user-lists')
          userListWrapper.style.display === "flex" ? userListWrapper.style.display = "none" : userListWrapper.style.display = "flex"
      },
      showHome: function () {
          const userListWrapper = document.querySelector('.home')
          userListWrapper.style.display === "flex" ? userListWrapper.style.display = "flex" : userListWrapper.style.display = "flex"
      },
      showLast: function () {
          const userListWrapper = document.querySelector('.home')
          userListWrapper.style.display === "flex" ? userListWrapper.style.display = "flex" : userListWrapper.style.display = "flex"
      }
  }

}
</script>

<style lang="scss" scoped> 
  .navbar{
    background-color: #ffd7d7;
    padding: 0;
    position: fixed;
    left: 0;
    height: 100vh;
    width: 5%;
    max-width: 5em;
    padding: 2em 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    a, button{
      text-decoration: none;
      color: gray;
        &.fa,&.fas{
            font-weight: 300;
        }
      &:hover{
        color: #f35252;
      }
      img{
        width: 35px;
        height: 35px;
        padding: 0;
        margin: 0;
        border-radius: 50%;
      }
    }
  }

  
    button{
      border-radius: 3em;
    }
    .nav-link{
      font-weight: 700;
      color: rgb(33, 33, 247);
      margin-right: 1em;
      font-size: .7em ;
      &.nav-button{
        background-color: transparent;
        border: none;
      }
    }
    form input{
      background-color: transparent;
      border: none;
      border-bottom: 1px solid blue;
      border-radius: 0;
      &:focus, &:active{
        background-color: transparent;
        border: unset;
        border-bottom: 1px solid blue;
        outline: none;
        box-shadow: unset;
      }
    }
    .avatar{
      margin-left: 1em;
      height: 45px;
      width: 45px;
      border-radius: 50%;
      padding: 3px;
      border: 2px solid gray;
    }
    @media screen and (max-width: 990px){
        .navbar{
            bottom: 0;
            left: 0;
            right: 0;
            height: 3em;
            top: auto;
            max-width: 100vw;
            width: 100vw;
            z-index: 999999;
            padding: 0 1em;
            justify-content: center;
        }
        .fa-3x{
            font-size: 2em;
        }
    }
</style>