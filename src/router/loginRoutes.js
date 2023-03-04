import LoginView from "../views/Login/LoginView.vue";

export default [
    {
        path: '/',
        name: 'login',
        component: LoginView,
        meta: {not_for_authenticated: true}
    },
    /*{
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/AboutView.vue'),
        meta: {requires_auth: true}
    },*/
]