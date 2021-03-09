<script>
import profileMixin from '../mixins/profile'

export default {
  mixins: [profileMixin]
};
</script>
<style lang="scss" scoped>
@import '../css/profile.scss';
</style>



<template>
  <article :class="`profile ${myprofile}`">
    <h2 class="my-5 text-uppercase font-weight-bold">Page de profile</h2>
    <img :src="user.avatar" alt="" />
    <div class="profile-details">
      <h2 class="font-weight-bold">{{ user.firstName }} {{ user.lastName }}</h2>
      <p class="badge badge-pill badge-primary">{{roles}} <span v-if="roles === 'admin'" class="fa fa-shield-alt"></span></p>
      <p>A rejoint Groupomania : <span class="text-orange">{{user.createdAt}}</span></p>
      <p class="email pt-3" v-if="user.id != getLogedUser.id"><a class="badge badge-pill badge-success" href="`mailto:${user.email}`">Envoyer un mail <span class="fa fa-envelope ml-1"></span></a></p>
      <div class="actions" v-if="user.roles">
        <router-link to="#" v-if="userLogedProfile || roles === 'admin' "  class="badge badge-pill badge-danger mr-1">Supprimer <span class="fa fa-trash"></span></router-link>
        <router-link to="#" v-if="userLogedProfile" class="badge badge-pill badge-success">Modifier <span class="fa fa-edit"></span></router-link>
      </div>
      <router-link to="#" v-if="userLogedProfile" class="badge badge-pill badge-success">Chnager mon mot de passe <span class="fa fa-lock"></span></router-link>
    </div>
  </article>
</template>
