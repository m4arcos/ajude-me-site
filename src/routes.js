import HomeIndex from './components/Home/Index.vue'
import LoginIndex from './components/Login/Index.vue'
import DonationsIndex from './components/Donations/Index.vue'
import OngsIndex from './components/Ongs/Index.vue'
import NeedsIndex from './components/Needs/Index.vue'
import UsersIndex from './components/Users/Index.vue'

const siteTitle = "Ajude.me";

const routes = [
    {
        path: '/',
        component: HomeIndex,
        name: 'home',
        meta: {
            title: siteTitle + ""
        }
    },
    {
        path: '/login',
        component: LoginIndex,
        name: 'login',
        meta: {
            title: siteTitle + " - Login"
        }
    },
    {
        path: '/donations',
        component: DonationsIndex,
        name: 'donations',
        meta: {
            title: siteTitle + " - Quero Ajudar!"
        }
    },
    {
        path: '/ongs',
        component: OngsIndex,
        name: 'ongs',
        meta: {
            title: siteTitle + " - ONGs"
        }
    },
    {
        path: '/needs',
        component: NeedsIndex,
        name: 'needs',
        meta: {
            title: siteTitle + " - Preciso de ajuda!"
        }
    },
    {
        path: '/users',
        component: UsersIndex,
        name: 'users',
        meta: {
            title: siteTitle + " - Usuários"
        }
    },
];

export default routes;