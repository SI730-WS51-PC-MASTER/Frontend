import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../public/pages/home.component.vue";
import ViewComponent from "../components/pages/component-view.component.vue";
import NotFoundComponent from "../public/pages/not-found.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home',                    name: 'home', component: HomeComponent, meta: { title: 'Home'}},
        { path: '/',                        redirect: '/home'},
        { path: '/components', name: 'components', component: ViewComponent, meta: { title: 'All Components' }}
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundComponent }
    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'PC-Master';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
})
export default router;