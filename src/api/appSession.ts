export interface AppSession {
  isSigned: boolean
  isSigning: boolean
  error?: string
  user?: {
    id: string
    email: string
    name: string
  }
}
