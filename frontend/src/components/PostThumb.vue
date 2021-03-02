<template>
  <article class="post">
    <a :href="'/post/' + post.id"  @click.prevent="showPost" class="post__body">
      <span >{{createdAt}}</span>
      <img v-if="post.image !== 'http://localhost:8000null'" :src="post.image" alt="">
      <p v-if="post.description" class="text-left px-3">{{post.description}}</p>
    </a>
  </article>
</template>

<script>
import moment from 'moment'
import { mapGetters} from "vuex";
export default {
  props: {post: {
    type: Object
  }},
  computed: {
    ...mapGetters(['getLogedUser']),
    createdAt() {
      moment.locale('fr');
      console.log(this.post)
      return moment(this.post.createdAt).fromNow()
    },
  },
  methods: {
    showPost : function () {
      let id = this.post.id
      this.$router.push({name: 'PostSingle', params: {id}})
    }
  }
}
</script>

<style lang="scss" scoped>
.post{
  box-shadow: 0 0 8px lightgray;
  border-radius: 5px;
  margin: 1em;
  border-radius: .5em;
  overflow: hidden;
  .post__body{
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: gray;
    width: 100%;
    margin: 0;
    height: 8em;
    padding: 0;
    img{
      flex-basis: 100%;
      flex: 1;
      width: 100%;
      object-fit: cover;
      object-position: top;
    }
    span{
      color: #ff5656;
    }
    p{
      max-height: 5em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
    }
  }
}

@media screen and (max-width: 768px) {
    .post{
      max-width: unset;
      margin-bottom: .5em;
    }
}

</style>