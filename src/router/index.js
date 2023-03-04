import {createRouter, createWebHistory} from 'vue-router'
import LoginRoutes from './loginRoutes'
import DashBoardRoutes from "./dashBoardRoutes";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...LoginRoutes,
        ...DashBoardRoutes,
        ...[
            {
                path: '/:catchAll(.*)*',
                name: 'not-found',
                component: NotFound,
            }
        ],
    ]
})


router.beforeEach((to, from, next) => {
    //Restrict access to protected routes if not logged in
    if (to.meta.requires_auth && window.axios.defaults.headers.Authorization.indexOf('null') >= 0) {
        next({name: 'login'})
        return
    }

    //Restrict access to Login page if user is logged in
    if (to.meta.not_for_authenticated && window.axios.defaults.headers.Authorization.indexOf('null') < 0) {
        next({name: 'dashboard'})
        return
    }

    // if (to.meta.permission && localStorage.getItem('permissions') && localStorage.getItem('permissions').indexOf(to.meta.permission.split('_').join(' ').replace(/\w+/g,
    //     function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();})) <= -1) {
    //     next({name: 'dashboard'})
    //     return
    // }

    next()
})

export default router
