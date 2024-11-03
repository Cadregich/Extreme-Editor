import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPaste } from '@fortawesome/free-solid-svg-icons';

library.add(faCopy, faPlay, faXmark, faPaste);

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(store)
    .mount('#app');