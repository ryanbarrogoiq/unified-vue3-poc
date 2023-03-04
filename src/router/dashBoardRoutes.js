import DashBoardView from "../views/DashBoardView.vue";

export default [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashBoardView,
        meta: {requires_auth: true}
    },
]