import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import Dropdown from 'primevue/dropdown'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Listbox from 'primevue/listbox'

//theme
import 'primevue/resources/themes/lara-light-indigo/theme.css'

//core
import 'primevue/resources/primevue.min.css'

//icons
import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.component('Button', Button)
app.component('SelectButton', SelectButton)
app.component('Dropdown', Dropdown)
app.component('Accordion', Accordion)
app.component('AccordionTab', AccordionTab)
app.component('Listbox', Listbox)
app.mount('#app')
