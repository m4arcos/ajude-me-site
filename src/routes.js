import HomeIndex from './components/Home/Index.vue'
import DonationsIndex from './components/Donations/Index.vue'
import OngsIndex from './components/Ongs/Index.vue'
import NeedsIndex from './components/Needs/Index.vue'

const routes = [
    { path: '/', component: HomeIndex, name: 'home' },
    { path: '/donations', component: DonationsIndex, name: 'donations' },
    { path: '/ongs', component: OngsIndex, name: 'ongs' },
    { path: '/needs', component: NeedsIndex, name: 'needs' },
];

export default routes;