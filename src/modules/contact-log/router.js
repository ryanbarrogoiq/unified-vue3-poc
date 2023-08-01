const Module = () => import("./Module.vue");
const ContactLogSearch = () => import("./views/ContactLogSearch.vue")
const ContactLogCreate = () => import("./views/ContactLogCreate.vue")

const moduleRoute = {
    path: "/contact-log",
    component: Module,
    children: [
        {
            path: '',
            name: 'contact-log-search',
            component: ContactLogSearch,
            meta: {
                requires_auth: true
            }
        },
        {
            path: 'create',
            name: 'contact-log-create',
            component: ContactLogCreate,
            meta: {
                requires_auth: true
            }
        },
    ]
};

export default moduleRoute;