import { appSessionAtom } from './appSession'

export async function signIn({
  user,
  password,
}: {
  user: string
  password: string
}): Promise<void> {
  // todo: use mutative or immer
  if (!user || !password) {
    appSessionAtom.set((appSession) => ({
      ...appSession,
      error: 'User and password are required',
    }))

    return
  }

  appSessionAtom.set((appSession) => ({
    ...appSession,
    isSigning: true,
    error: undefined,
  }))

  await new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (user === 'jon@hotmail.com' && password === '123') {
        appSessionAtom.set((appSession) => ({
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
        appSessionAtom.set((appSession) => ({
          ...appSession,
          isSigning: false,
          isSigned: false,
          error: 'Invalid user or password',
        }))
        reject()
      }
    }, 600)
  })
}
