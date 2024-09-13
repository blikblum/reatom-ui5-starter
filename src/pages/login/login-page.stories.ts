import { AppSession } from '../../api/appSession.js'
import './login-page.js'

const defaultAppSesison: AppSession = {
  isSigned: false,
  isSigning: false,
  error: undefined,
  user: undefined,
}

export default {
  title: 'Components/LoginPage',
  component: 'login-page',
  parameters: {
    actions: {
      handles: [],
    },
  },
  args: {
    appSession: defaultAppSesison,
  },
}

export const Default = {
  args: {},
}

export const Signing = {
  args: {
    appSession: {
      ...defaultAppSesison,
      isSigning: true,
    },
  },
}

export const withError = {
  args: {
    appSession: {
      ...defaultAppSesison,
      error: 'Invalid email or password',
    },
  },
}
