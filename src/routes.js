import HomeIndex from './components/Home/Index.vue'
import DonationsIndex from './components/Donations/Index.vue'

const routes = [
    { path: '/', component: HomeIndex, name: 'home' },
    { path: '/donations', component: DonationsIndex, name: 'donations' },
];

export default routes;