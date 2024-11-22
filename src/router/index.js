import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../public/pages/home.component.vue";
import ViewComponent from "../components/pages/component-view.component.vue";
import NotFoundComponent from "../public/pages/not-found.component.vue";
import ShoppingCartComponent from "@/orders/pages/shopping-cart.component.vue";
import TechnicalSupportComponent from "@/technical-support/pages/technician-service-management.component.vue";
import WishlistManagementComponent from "@/wishlist/pages/wishlist-management.component.vue";
import TechnicalSupportManagementComponent from "@/technical-support/pages/technical-support-management.component.vue";
import SignInComponent from "../iam/pages/sign-in.component.vue";
import SignUpComponent from "../iam/pages/sign-up.component.vue";
import {authenticationGuard} from "../iam/services/authentication.guard.js";
import CartManagerComponent from "@/orders/pages/cart-manager.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home',                    name: 'home', component: HomeComponent, meta: { title: 'Home'}},
        { path: '/get-guidance', name: 'guidance', component: TechnicalSupportComponent, meta: { title: 'Get Guidance'}},
        { path: '/view-your-request-for-guidance-submitted', name: 'technical-support', component: TechnicalSupportManagementComponent, meta: { title: 'View Requests submitted'}},
        { path: '/shopping-cart', name: 'shopping-cart', component: ShoppingCartComponent },
        { path: '/order-manager', name: 'order-manager', component: CartManagerComponent },
        { path: '/components', name: 'components', component: ViewComponent, meta: { title: 'All Components' }},
        { path: '/wishlist', name: 'wishlist', component: WishlistManagementComponent, meta: { title: 'Wishlist'} },
        { path: '/sign-in',                 name: 'sign-in',    component: SignInComponent,             meta: { title: 'Sign In'}},
        { path: '/sign-up',                 name: 'sign-up',    component: SignUpComponent,             meta: { title: 'Sign Up'}},
        { path: '/',                        redirect: '/home'},
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundComponent },
    ]
});

router.beforeEach((to,
                   from,
                   next) => {
    let baseTitle = 'PC Master';
    document.title = `${baseTitle} | ${to.meta['title']}`;

    // Call the authentication guard
    authenticationGuard(to, from, next);
})
export default router;
