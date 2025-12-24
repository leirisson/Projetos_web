import { Client } from 'whatsapp-web.js'


export const clientWhatsapp = new Client({
    puppeteer:{
        headless: false
    }
})


clientWhatsapp.initialize()