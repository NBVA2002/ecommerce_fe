import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import "./assets/style/global.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faCartShopping, faUserSecret, faFilter, faUser, faBell, faMagnifyingGlass, faLock, faStar, faSortUp, faSortDown, faRightFromBracket, faUsers, faBars, faBagShopping, faCreditCard, faEnvelope, faPhone, faLocationDot, faComment, faHouse, faShop, faUserTie, faCrown, faReceipt, faEye, faEyeSlash, faArrowUp, faArrowDown, faChartLine, faStore, faWallet, faClipboardList, faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret, faCartShopping, faFilter, faUser, faBell, faMagnifyingGlass, faLock, faStar, faSortUp, faSortDown, faRightFromBracket, faUsers, faBars, faBagShopping, faCreditCard, faEnvelope, faPhone, faLocationDot, faComment, faHouse, faShop, faUserTie, faCrown, faReceipt, faEye, faEyeSlash, faArrowUp, faArrowDown, faChartLine, faStore, faWallet, faClipboardList, faAngleDown, faAngleUp)
library.add(faFacebookF, faTwitter, faInstagram)

createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount("#app");
