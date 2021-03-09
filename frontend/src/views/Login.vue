<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-md-6 image d-md-block">
          <img src="@/assets/img/login-bg.jpg" alt="image abstract" />
        </div>
        <div class="col-md-6">
          <form @submit.prevent="login" novalidate>
            <img src="@/assets/logos/icon-above-font.svg" alt="logo du site" />
            <h2>Me connecter</h2>
            <div v-if="error" class="alert alert-warning">
              {{ error }}
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                @focus="resetError"
                type="email"
                v-model="email"
                placeholder="jean.dao@exemple.com"
                id="email"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="password">Mot de passe</label>
              <input
                @focus="resetError"
                v-bind:type="passType"
                placeholder="Mot de passe"
                v-model="password"
                id="password"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <button type="submit" id="submit" class="btn btn-lg btn-danger">
                Me connecter
              </button>
              <p v-if="shwoForgetPassword" class="mt-1">
                <router-link to="#">Mot de passe oublié</router-link>
              </p>
              <p class="mt-1">
                <router-link to="/singin">Créez votre compte içi</router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import Api from '@/helpers/api/request'
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      passType: "password",
      email: "",
      password: "",
      error: "",
      shwoForgetPassword: false,
    };
  },
  methods: {
    ...mapActions(["logUser"]),
    login: function () {
      Api.login(this)
    },
    resetError: function () {
      this.error = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../css/login.scss';
</style>