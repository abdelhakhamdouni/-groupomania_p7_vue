<template>
    <div class="user-lists px-3">
      <h5 class="py-3">
        Liste des membres
      </h5>
      <div class="users">
          <div class="user" v-for="user in users" :key="user.id">
            <users-thumb :user="user"/>
          </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import UsersThumb from "./UsersThumb";
export default {
    components: {UsersThumb},
    data() {
    return {
      users: []
    }
  },
  methods: {
    ...mapGetters(['getLogedUser']),
  },
  created() {
    axios.get(`http://localhost:8000/api/auth/users`, {
      headers: {
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(reponse=> {
      this.users = reponse.data.users
    })
    .catch(err => console.log(err))
  },
}
</script>

<style lang="scss" scoped>
.user-lists{
  position: fixed;
  height: 100vh;
  width: 25%;
  left: 5%;
  z-index: 999;
    flex-direction: column;
    display: flex;
    .users{
        flex-direction: column;
        display: flex;
    }
  div{
      padding-top: .5em;
  }
}
@media screen and (max-width: 990px){
    .user-lists{
        width: 100%;
        margin-left: 0;
        left: unset;
        position: relative;
        padding-bottom: 5em;
    }
}
</style>