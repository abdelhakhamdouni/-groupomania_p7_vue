import axios from "axios";
import { mapActions } from "vuex";
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    ...mapActions(["setPosts"]),
  },
  created() {
    axios
      .get("http://localhost:8000/api/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((reponse) => {
        this.posts = reponse.data;
        this.setPosts(reponse.data);
      })
      .catch((err) => console.log(err));
  },
};