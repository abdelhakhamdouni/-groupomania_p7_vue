<template>
  <div id="app">
    <div class="hideOnMobile" v-if="isUserLogged">
      <status-bar />
      <last-posts />
      <users-list />
    </div>
    <div class="showOnMobile">
      <StatusBarMobile />
    </div>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import StatusBar from "./components/StatusBar.vue";
import LastPosts from "./components/LastPosts.vue";
import UsersList from "./components/UsersList";
import StatusBarMobile from "./components/StatusBarMobile";
export default {
  components: { StatusBarMobile, UsersList, StatusBar, LastPosts },
  computed: {
    ...mapGetters(["isUserLogged"]),
  },
  methods: {
    ...mapActions(["logUser", "setUserData"]),
    log: () => {
      if (this.isUserLogged) {
        console.log("user logget");
      }
    },
    checkLoggedUser: function () {
      if (localStorage.getItem("token")) {
        let token = localStorage.getItem("token");
        axios
          .get("http://localhost:8000/api/auth", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            this.logUser(true);
            this.setUserData(res.data.user);
            this.$router.push({ name: "Home" });
          })
          .catch((err) => console.log(err));
      }
    },
  },
  created() {
    this.checkLoggedUser();
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-size: 12px;
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
.showOnMobile {
  display: none;
}
@media screen and (max-width: 990px) {
  .hideOnMobile {
    display: none;
  }
  .showOnMobile {
    display: flex;
  }
}
body,
#app {
  min-height: 100vh;
}
</style>
