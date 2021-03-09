<template>
    <router-link :to="`/profile/${user.id}`" class="userThumb">
        <img v-if="user.avatar != 'http://localhost:8000null'" :src="user.avatar" alt="">
        <div class="metadat">
            <h5>{{user.firstName}} {{user.lastName}}</h5>
            <h6>A rejoint depuis {{createdAt}}</h6>
        </div>
        <div class="user-star" v-if="user.roles.includes('ROLE_ADMIN')">
            <span class="fa fa-shield-alt" title="Badge administrateur / modérateur"></span>
        </div>

    </router-link>
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
        height: 4em;
        overflow: hidden;
        text-decoration: none;
        color: rgb(77, 77, 77);
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
            height: 4em;
        }
        h5{
            font-size: 14px;
            margin: 0;
            margin-left: 1em;
            text-align: left;
            font-weight: 600;
        }
        h6{
            font-size: 12px;
            margin: 0;
            margin-left: 1em;
        }
        .user-star{
            justify-self: flex-end;
            flex: 1;
            text-align: right;
            color: #f35252;
        }
    }

</style>