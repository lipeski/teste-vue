import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
} from "vuetify/labs/VDataTable";

const vuetify = createVuetify({
    components: {
        ...components,
        VDataTable,
        VDataTableServer,
        VDataTableVirtual,
    },
    directives,
    icons:{
        iconfont: 'mdi',
    },
        
})

createApp(App).use(store).use(router).use(vuetify).mount('#app')
