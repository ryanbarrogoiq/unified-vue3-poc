<template>
    <v-app-bar flat>
        <v-spacer>Dashboard</v-spacer>
        <v-icon class="mr-5">
            <font-awesome-icon icon="fas fa-user-cog" />
        </v-icon>
        <v-icon class="mr-5">
            <font-awesome-icon :icon="['fas', 'fa-user-check']"/>
        </v-icon>
        <v-icon @click="logout" class="mr-5">
            <font-awesome-icon icon="fas fa-sign-out-alt" />
        </v-icon>
    </v-app-bar>
</template>

<script>
export default {
    name: "AppBar",
    methods: {
        async logout() {
            this.$cookies.remove('token')

            setTimeout(function () {
                localStorage.removeItem('userdata')
                localStorage.removeItem('permissions')
                location.reload()
            }, 1000);
        },
    }
}
</script>
