<template>
    <form class="commentForm">
        <textarea  rows="1" v-model="commentBody" placeholder="Votre commentaire içi...."></textarea>
        <button @click.prevent="envoyer" type="submit">Valider</button>
    </form>
</template>

<script>
    import  axios from 'axios'
    import { mapGetters, mapActions } from 'vuex'
    import moment from "moment";
    export default {
        name: "CommentForm",
        props: {
            postId: {
                type: Number
            }
        },
        data(){
            return{
                commentBody: ""
            }
        },
        methods: {
            ...mapGetters(['getLogedUser']),
            ...mapActions(['setComments']),
            envoyer: function(){
                let content = this.commentBody
                let userId = this.getLogedUser().id
                let postId = this.postId
                let commentId  = 0

                if(!content) return false

                let comment = { content, userId, postId, commentId}
                axios.post( "http://localhost:8000/api/comments", comment, {
                    headers: { Authorization: "Bearer " + localStorage.getItem('token') }
                    })
                .then( () => {
                    axios
                        .get(`http://localhost:8000/api/comments/${this.postId}`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        }).then(response => {
                        console.log(response)
                        moment.locale('fr');
                        let comments = response.data
                        moment.locale('fr');
                        comments.forEach(comment =>{
                            comment.createdAt =  moment(comment.createdAt).fromNow()
                        })
                        this.setComments(comments)
                        this.commentBody = ""
                    })
                })
                .catch(err => console.log(err))
            }
        }
    }
</script>

<style lang="scss" scoped>
    .commentForm{
        padding: 1em .5em;
        width: 100%;
        display: flex;
        position: sticky;
        top: 0;
        background-color: #fff;
        z-index: 1;
        transform-origin: top;
        .input{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            position: relative;
        }
        textarea{
            border: 1px solid rgb(216, 216, 216);
            border-radius: 1em;
            padding: .3em 1em;
            background-color: #dfdfdf;
            margin-right: .5em;
            flex: 1;
            &:focus{
                outline: none;
                background-color: #fff;
            }
        }
            button {
                background-color: transparent;
                border: 1px solid blueviolet;
                border-radius: 2em;
                padding: 0em 1.5em;
                height: 2em !important;
                &:hover{
                    background-color: #f35252;
                    color: white;
                }
            }
        }
</style>