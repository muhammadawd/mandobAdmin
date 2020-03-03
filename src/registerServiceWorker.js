/* eslint-disable no-console */

import {register} from 'register-service-worker'

// development  , production
if (process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}service-worker.js`, {
        registrationOptions: {scope: './'},
        ready() {
            console.log(
                'App is being served from cache by a service worker.\n' +
                'For more details, visit https://goo.gl/AFskqB'
            )
        },
        registered(register) {
            console.log('Service worker has been registered.')
        },
        cached(register) {
            console.log('Content has been cached for offline use.')
        },
        updatefound(register) {
            console.log('New content is downloading.')
        },
        updated(register) {
            console.log('New content is available; please refresh.')
            setTimeout(() => {
                // location.reload()
            }, 1000);
        },
        offline(register) {
            console.log('No internet connection found. App is running in offline mode.')
        },
        fetch(register) {
            console.log('fetch .....')
        },
        error(error) {
            console.error('Error during service worker registration:', error)
        }
    })
}
