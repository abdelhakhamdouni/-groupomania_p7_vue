import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import axios from "axios";

export default {
    data(){
        return {
          roles: "",
          user: {},
          userLogedProfile: false,
          myprofile: ""
        }
      },
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
            this.user = user
            user.roles.includes('ROLE_ADMIN') ? this.roles = "admin" : this.roles = "Membre"
            user.id === this.getLogedUser().id ? this.userLogedProfile = true : this.userLogedProfile = false
            user.id === this.getLogedUser().id ? this.myprofile ="myprofile" : this.myprofile=""
            
          });
    
      },
      methods: {
        ...mapGetters(["getProfile", "getLogedUser"]),
        ...mapActions(["setProfile"]),
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
              this.user = user
              console.log(this.getLoggedUser)
              user.id === this.getLogedUser().id ? this.userLogedProfile = true : this.userLogedProfile = false
              user.id === this.getLogedUser().id ? this.myprofile ="myprofile" : this.myprofile=""
            });
        },
      },
}