import { registerTaskHandler } from '../helpers/domTask'
import { signIn } from '../stores/appSession.service'

registerTaskHandler('sign-in', signIn)
