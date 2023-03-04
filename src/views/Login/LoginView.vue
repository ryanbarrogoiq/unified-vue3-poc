<template>
    <section id="login">
        <v-container fluid>
            <v-row no-gutters>
                <v-col cols="4" class="left-panel">
                    <v-container>
                        <v-row class="text-center" justify="center" align="center">
                            <v-col cols="12">
                                <v-img class="mx-auto" :src="imgUrl" max-width="200px"/>
                                <v-col>
                                    <p>Welcome to IQ:caremanager</p>
                                </v-col>
                                <v-col>
                                    <form>
                                        <v-col>
                                            <input v-model="email" type="text" placeholder="Email">
                                        </v-col>
                                        <v-col>
                                            <input v-model="password" type="password" placeholder="Password">
                                        </v-col>
                                        <v-col>
                                            <v-btn class="main-btn" @click="getAuth">Login</v-btn>
                                        </v-col>
                                    </form>
                                </v-col>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
                <v-col cols="8" class="right-panel">
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import * as Api from "../../api";
import {LS_KEY_USER_DATA} from "../../constants";

export default {
    name: 'LoginView',
    methods: {
        async getAuth() {
            let _s = this

            let body = {
                email: _s.email,
                password: _s.password
            }

            try {
                let userLogin = await Api.default.AuthService.getToken(body)

                window.localStorage.setItem(LS_KEY_USER_DATA, JSON.stringify(userLogin.data))
                this.$cookies.set('token', userLogin.data.token)

                // let getUserPermission =  await Api.default.AuthService.getUserPermissions()

                // if(getUserPermission.status === 200){
                //     localStorage.setItem('permissions', JSON.stringify(getUserPermission.data))
                // }

                window.location.reload()

            } catch (e) {
                console.log(e)

                if (e.response.status === 500) {
                    console.log('Internal Server Error!')
                } else if (e.response.status === 401) {
                    console.log(e.response.data.Error)
                } else if (e.response.status === 422) {
                    console.log('Unprocessable Entity!')
                }
            }
        },
    },
    data() {
        return {
            email: '',
            lang: 'en',
            password: '',
            imgUrl: new URL('@/assets/img/auth/left-panel.png', import.meta.url).href, // TODO: Change implementation
        }
    },
}
</script>