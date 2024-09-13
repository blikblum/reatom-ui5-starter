import { atom } from '@reatom/core'
import { AppSession } from '../api/appSession'

export const appSessionAtom = atom<AppSession>({
  isSigned: false,
  isSigning: false,
  error: undefined,
  user: undefined,
})

export const isSignedAtom = atom((ctx) => {
  const appSession = ctx.spy(appSessionAtom)
  return appSession.isSigned
})
