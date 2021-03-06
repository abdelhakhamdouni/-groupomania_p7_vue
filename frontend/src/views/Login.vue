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
  import {login} from '@/helpers/api/request.js'
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
      login(this)
    },
    resetError: function () {
      this.error = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #327;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 90000;
}
.container,
.row {
  height: 100vh;
  margin: auto;
  .col-md-6 {
    height: 100%;
    margin: 0;
    padding: 0;
    &.image {
      display: none;
    }
    &:last-of-type {
      border: 1px solid #999;
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    form {
      height: 100%;
      width: 100%;
      padding: 0 1em;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: white;
      img {
        height: 80px;
        width: 80px;
        object-fit: cover;
        margin-bottom: 2em;
        border-radius: 50%;
        padding: 0.3em;
        border: 2px solid lightgray;
      }
      .form-group {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        padding: 0 1em;
        label {
          align-self: flex-start;
        }
        input {
          width: 100%;
          &::placeholder {
            color: gray;
          }
        }
      }
      .btn {
        margin-top: 1em;
        border-radius: 3em;
      }
    }
  }
}
  @media screen and (max-width: 990px){
    .container .col-md-6:last-of-type{
      border: unset;
    }
  }
</style>