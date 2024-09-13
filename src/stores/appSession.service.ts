import { appCtx } from './appCtx'
import { appSessionAtom } from './appSession'

export async function signIn({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<void> {
  // todo: use mutative or immer
  appSessionAtom(appCtx, (appSession) => ({
    ...appSession,
    isSigning: true,
    error: undefined,
  }))

  await new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (email === 'jon@hotmail.com' && password === '123') {
        appSessionAtom(appCtx, (appSession) => ({
          ...appSession,
          isSigned: true,
          isSigning: false,
          user: {
            id: '1',
            email: 'jon@hotmail.com',
            name: 'Jon',
          },
        }))
        resolve()
      } else {
        appSessionAtom(appCtx, (appSession) => ({
          ...appSession,
          isSigning: false,
          isSigned: false,
          error: 'Invalid email or password',
        }))
        reject()
      }
    }, 600)
  })
}
