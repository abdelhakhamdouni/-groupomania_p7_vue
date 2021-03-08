import axios from "axios";
import moment from "moment";

const Api = {
  login: function (vuem) {
    vuem.error = "";
    axios
      .post("http://localhost:8000/api/auth/login", {
        email: vuem.email,
        password: vuem.password,
      })
      .then((response) => {
        if (
          response.status === 200 &&
          response.data.token
        ) {
          vuem.$store.commit("LOG_USER", true);
          localStorage.setItem("token", response.data.token);
          vuem.$router.push({name: "Home"});
        } else {
          vuem.error = "Votre email ou mot de passe est incorrécte";
          vuem.shwoForgetPassword = true;
        }
      })
      .catch(() => {
        vuem.error = "Votre email ou mot de passe est incorrécte";
        vuem.shwoForgetPassword = true;
      });
  },
  getPosts: function (vuem) {
    axios
      .get(`http://localhost:8000/api/posts/post/${vuem.id}`, {
        timeout: 1000,
        headers: {Authorization: "Bearer " + localStorage.getItem("token")},
      })
      .then((response) => {
        moment.locale("fr");
        let poste = response.data;
        poste.createdAt = moment(poste.createdAt).fromNow();
        vuem.post = poste
        vuem.setPost(poste);
      });
  },
  getComments: function (vuem) {
    axios
      .get(`http://localhost:8000/api/comments/${vuem.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(response => {
        console.log(response)
        moment.locale('fr');
        let comments = response.data
        moment.locale('fr');
        comments.forEach(comment => {
          comment.createdAt = moment(comment.createdAt).fromNow()
        })
        vuem.comments = response.data
      }).catch((err) => {
      console.log(err)
      vuem.comments = []
    })
  },
    likePost: function (vuem) {
        let data = {
            userId: vuem.getLogedUser.id
        }
        axios.post(`http://localhost:8000/api/likes/${vuem.getPost.id}/${!vuem.youLikedPost ? 1 : 0}`, data, {
            timeout: 1000,
            headers: {Authorization: "Bearer " + window.localStorage.getItem('token')},
        })
          .then(() => {
              axios
                .get(`http://localhost:8000/api/posts/post/${vuem.getPost.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                .then((reponse) => {
                    axios
                      .get("http://localhost:8000/api/posts", {
                          headers: {
                              Authorization: `Bearer ${localStorage.getItem("token")}`,
                          },
                      })
                      .then((reponse) => {
                          vuem.posts = reponse.data;
                          vuem.setPosts(reponse.data);
                      })
                    vuem.post = reponse.data;
                    vuem.setPost(reponse.data);
                    vuem.youLikedPost = !this.youLikedPost
                })
          })
    },


}

export default Api;