const Module = () => import("./Module.vue");
const DashBoard = () => import("./views/DashBoard.vue")
const Actions = () => import("./views/Actions.vue")

const moduleRoute = {
    path: "/",
    component: Module,
    children: [
        {
            path: '',
            name: 'dashboard',
            component: DashBoard,
            meta: {
                requires_auth: true
            }
        },
        {
            path: '/actions',
            name: 'actions',
            component: Actions,
            meta: {
                requires_auth: true
            }
        },
    ]
};

export default moduleRoute;