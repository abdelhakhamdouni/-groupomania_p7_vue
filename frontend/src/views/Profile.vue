<template>
  <article class="profile">
    <h2 class="my-5 text-uppercase font-weight-bold">Page de profile</h2>
    <img :src="getProfile.avatar" alt="" />
    <div class="profile-details">
      <h2 class="font-weight-bold">{{ getProfile.firstName }} {{ getProfile.lastName }}</h2>
      <p class="badge badge-pill badge-primary">{{role}} <span v-if="this.getProfile.roles.includes('ROLE_ADMIN')" class="fa fa-shield-alt"></span></p>
      <p>A rejoint Groupomania : <span class="text-orange">{{getProfile.createdAt}}</span></p>
      <p class="email pt-3" v-if="getProfile.id != getLogedUser.id"><a class="badge badge-pill badge-success" href="`mailto:${getProfile.email}`">Envoyer un mail <span class="fa fa-envelope ml-1"></span></a></p>
      <div class="actions" v-if="getProfile.roles">
        <router-link to="#" v-if="getProfile.id == getLogedUser.id || getLogedUser.roles.includes('ROLE_ADMIN')"  class="badge badge-pill badge-danger mr-1">Supprimer <span class="fa fa-trash"></span></router-link>
        <router-link to="#" v-if="getProfile.id == getLogedUser.id" class="badge badge-pill badge-success">Modifier <span class="fa fa-edit"></span></router-link>
      </div>
      <router-link to="#" v-if="getProfile.id == getLogedUser.id" class="badge badge-pill badge-success">Chnager mon mot de passe <span class="fa fa-lock"></span></router-link>
    </div>
  </article>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import axios from "axios";

export default {
  created() {
    this.id = this.$route.params.id;
    axios
      .get(`http://localhost:8000/api/auth/${this.id}`, {
        timeout: 1000,
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        moment.locale("fr");
        let user = response.data;
        user.createdAt = moment(user.createdAt).fromNow();
        this.setProfile(user);
      });
  },
  methods: {
    ...mapGetters(["getProfile", "getLogedUser"]),
    ...mapActions(["setProfile"]),
  },
  computed: {
    ...mapGetters(["getProfile", "getLogedUser"]),
    role: function(){
      console.log(this.getProfile.roles)
     return  this.getProfile.roles.includes('ROLE_ADMIN') ? "Admin" : "Membre"
    }
  },
  watch: {
    "$route.params.id": function () {
      this.id = this.$route.params.id;
      axios
        .get(`http://localhost:8000/api/auth/${this.id}`, {
          timeout: 1000,
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((response) => {
          moment.locale("fr");
          let user = response.data;
          user.createdAt = moment(user.createdAt).fromNow();
          this.setProfile(user);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  min-height: 100vh;
  height: 100vh;
  width: 45%;
  position: absolute;
  left: 30%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding-top: 0;
  border-left: 1px solid #adadad;
  border-right: 1px solid #adadad;
  img {
    width: 5em;
    height: 5em;
    padding: 3px;
    border: 2px solid gray;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    position: relative;
    z-index: 2;
  }
  .profile-details{
    box-shadow: 0 0 10px rgb(221, 221, 221);
    padding: 5em 1em;
    position: relative;
    transform: translateY(-2.5em);
    z-index: 1;
    width: 80%;
    h2{
      font-size: 1em !important;
    }
    .text-orange{
      color: orange;
    }
  }
}
@media screen and (max-width: 990px){
  .profile{
    width: 100%;
    left: unset;
    margin: auto;
    position: relative;
    border: none;
  }

}
</style>