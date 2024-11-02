import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../public/pages/home.component.vue";
import ViewComponent from "../components/pages/component-view.component.vue";
import NotFoundComponent from "../public/pages/not-found.component.vue";
import ShoppingCartComponent from "@/orders/pages/shopping-cart.component.vue";
import TechnicalSupportComponent from "@/technical-support/pages/technician-service-management.component.vue";
import WishlistManagementComponent from "@/wishlist/pages/wishlist-management.component.vue";
import TechnicalSupportManagementComponent from "@/technical-support/pages/technical-support-management.component.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home',                    name: 'home', component: HomeComponent, meta: { title: 'Home'}},
        { path: '/get-guidance', name: 'guidance', component: TechnicalSupportComponent, meta: { title: 'Get Guidance'}},
        { path: '/view-your-request-for-guidance-submitted', name: 'technical-support', component: TechnicalSupportManagementComponent, meta: { title: 'View Requests submitted'}},
        { path: '/shopping-cart', name: 'shopping-cart', component: ShoppingCartComponent },
        { path: '/components', name: 'components', component: ViewComponent, meta: { title: 'All Components' }},
        { path: '/wishlist', name: 'wishlist', component: WishlistManagementComponent, meta: { title: 'Wishlist'} },
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundComponent },
        { path: '/',                        redirect: '/home'}
    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'ACME Learning Center';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
})
export default router;
