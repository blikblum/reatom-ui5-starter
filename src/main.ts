import { Router, WCRouteDef } from 'slick-router'
import './setup/web-preset'
import { isSignedAtom } from './stores/appSession'
import { appCtx } from './stores/appCtx'

// pages
import './pages/login/login-page'
import './pages/app-shell/app-shell-page'
import './pages/home/home-page'
import './pages/settings/settings-page'

// todo: remove when fixed upstream
type RouteDef = WCRouteDef & { children?: RouteDef[] }

const routes: RouteDef[] = [
  { name: 'login', path: '/', component: 'login-page' },
  {
    name: 'app',
    path: '/app',
    component: 'app-shell-page',
    beforeEnter(transition) {
      const isSigned = appCtx.get(isSignedAtom)
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

appCtx.subscribe(isSignedAtom, (isSigned) => {
  if (!isSigned) {
    router.transitionTo('login')
  } else {
    router.transitionTo('app')
  }
})
