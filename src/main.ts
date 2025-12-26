import { Router, WCRouteDef } from 'slick-router'
import './setup/web-preset'
import { isSignedAtom } from './stores/appSession'

// pages
import './pages/login/login-page'
import './pages/app-shell/app-shell-page'
import './pages/home/home-page'
import './pages/settings/settings-page'

const routes: WCRouteDef[] = [
  { name: 'login', path: '/', component: 'login-page' },
  {
    name: 'app',
    path: '/app',
    component: 'app-shell-page',
    beforeEnter(transition) {
      const isSigned = isSignedAtom()
      if (!isSigned) {
        transition.redirectTo('login')
        return false
      }
      return true
    },
    children: [
      { name: 'home', path: '', component: 'home-page' },
      { name: 'settings', path: 'settings', component: 'settings-page' },
    ],
  },
]

const router = new Router({ routes, outlet: 'router-outlet' })

router.listen()

isSignedAtom.subscribe((isSigned) => {
  if (!isSigned) {
    router.transitionTo('login')
  } else {
    router.transitionTo('app')
  }
})
