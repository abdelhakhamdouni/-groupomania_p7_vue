<template>
  <div id="app">
    <main class="main">
      <router-view/>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'
import axios from "axios"
export default {
  components: {  },
  computed:{

     ...mapGetters(['isUserLogged'])
  },
  methods:{
    ...mapActions(['logUser', 'setUserData']),
    log: ()=>{
      if(this.isUserLogged){
        console.log("user logget")
      }
    },
    checkLoggedUser: function(){
      if(localStorage.getItem('token')){
        let token = localStorage.getItem('token')
        axios.get("http://localhost:8000/api/auth", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          this.logUser(true)
          this.setUserData(res.data.user)
          this.$router.push({name: 'Home'})
        })
        .catch(err => console.log(err))
      }
    }
  },
  created(){
    this.checkLoggedUser()
  }
}

</script>

<style lang="scss">
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fdfeff;
  margin: 0;
  padding: 0;
}


body, #app{
  min-height: 100vh;
}

</style>
