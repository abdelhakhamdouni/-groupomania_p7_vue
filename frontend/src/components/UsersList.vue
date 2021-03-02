<template>
    <div class="user-lists">
      <h5 class="pt-3">
        Liste des membres
      </h5>
      <div class="users" v-for="user in users" :key="user.id">
        <users-thumb :user="user"/>
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
  }
}
</script>

<style>
.user-lists{
  position: fixed;
  height: 100vh;
  width: 25%;
  left: 5%;
  z-index: 999;
  div{
      padding-top: 3em;
  }
}
</style>