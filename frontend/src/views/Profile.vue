<template>
  <article class="profile">
    <img :src="getProfile.avatar" alt="" />
    <div class="profile-details">
      <h2 class="font-weight-bold">{{ getProfile.firstName }} {{ getProfile.lastName }}</h2>
      <p class="badge badge-pill badge-primary">{{role}} <span v-if="this.getProfile.roles.includes('ROLE_ADMIN')" class="fa fa-star"></span></p>
      <p class="text-orange">{{getProfile.createdAt}}</p>
      <p class="email pt-3">{{getProfile.email}}</p>
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
    ...mapGetters(["getProfile"]),
    ...mapActions(["setProfile"]),
  },
  computed: {
    ...mapGetters(["getProfile"]),
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
  justify-content: center;
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
</style>