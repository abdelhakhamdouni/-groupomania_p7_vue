<template>
    <div class="comments">
        <div v-for="comment in comments" :key="comment.CommentId">
            <Comment :comment="comment" />
        </div>
    </div>
</template>

<script>
    import Comment from "./Comment";
    export default {
        name: "CommentList",
        components: {Comment},
        props: {
            comments: {
                type: Array
            }
        },

    }
</script>

<style scoped>

</style>