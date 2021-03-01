<template>
    <div class="userThumb">
        <img v-if="user.avatar != 'http://localhost:8000null'" :src="user.avatar" alt="">
        <div class="metadat">
            <h5>{{user.firstName}} {{user.lastName}}</h5>
            <h6>A rejoint depuis {{createdAt}}</h6>
        </div>

    </div>
</template>

<script>
    import moment from "moment";
    export default {
        name: "UsersThumb",
        props: {
            user: {
                type: Object
            }
        },
        computed: {
            createdAt() {
                moment.locale('fr');
                return moment(this.user.createdAt).fromNow()
            },
        },
        created() {
            console.log(this.user)
        }
    }
</script>

<style scoped lang="scss">
    .userThumb{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 1em 0 0;
        border: 1px solid lightblue;
        margin: .5em;
        border-radius: 1em;
        height: 3.5em;
        overflow: hidden;
        img{
            width: 3.5em;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
        .metadata{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
        }
        h5{
            font-size: 14px;
            margin-left: 1em;
            text-align: left;
            font-weight: 600;
        }
        h6{
            font-size: 12px;
            margin-left: 1em;
        }
    }

</style>