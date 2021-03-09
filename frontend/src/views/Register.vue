<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-md-6 image d-md-block">
          <img src="@/assets/img/login-bg.jpg" alt="image abstract" />
        </div>
        <div class="col-md-6">
          <form @submit.prevent="register">
            <img src="@/assets/logos/icon-above-font.svg" alt="logo du site" />
            <h2>Créer mon compte</h2>
            <div class="form-group">
              <label for="password">Nom</label>
              <input
                type="text"
                placeholder="Dao"
                v-model="firstName"
                id="firstName"
                class="form-control"
                required
              />
              <label for="password">Prénom</label>
              <input
                type="text"
                placeholder="Jean"
                v-model="lastName"
                id="lastName"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <img id="avatarPreview" alt="" />
              <label
                for="avatar"
                class="btn btn-outline-warning align-self-center"
                >Image de profil</label
              >
              <input
                type="file"
                placeholder="Jean"
                id="avatar"
                class="d-none"
                @change="setAvatar"
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                v-model="email"
                placeholder="jean.dao@exemple.com"
                id="email"
                class="form-control"
                required
              />

              <label for="password">Mot de passe</label>
              <input
                v-bind:type="passType"
                placeholder="Mot de passe"
                v-model="password"
                id="password"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-lg btn-danger">
                Créer mon compte
              </button>
              <p class="mt-3">
                <router-link to="/login">Connexion</router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      passType: "password",
      email: "",
      password: "",
      name: "",
      firstName: "",
      lastName: "",
      avatar: "",
    };
  },

  methods: {
    ...mapActions(["logUser"]),
    setAvatar: function (event) {
      this.avatar = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        let avatarPreview = document.querySelector("#avatarPreview");
        avatarPreview.style.display = "block";
        avatarPreview.src = e.target.result;
        this.avatar = event.target.files[0];
      };
      reader.readAsDataURL(event.target.files[0]);
    },
    register: function () {
      let formData = new FormData();
      formData.append(
        "user",
        JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        })
      );
      if (this.avatar !== null) {
        formData.append("image", this.avatar || null);
      }
      axios
        .post("http://localhost:8000/api/auth/signup", formData)
        .then((response) => {
          if (response.status === 201) {
            this.$router.push({ name: "Login" });
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #327;
  position: relative;
}
.container,
.row {
  height: 100vh;
  margin: unset;
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
      height: 100vh;
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
        padding: 0 0.5em;
        label {
          align-self: flex-start;
        }
        input {
          width: 100%;
          &:placeholder {
            color: gray;
          }
        }
        img {
          display: none;
          margin: 0;
        }
      }
      .btn {
        margin-top: 0.5em;
        border-radius: 3em;
      }
    }
  }
}
</style>