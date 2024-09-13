import { setDefaultCtx } from 'lit-reatom'
import { connectLogger } from '@reatom/logger'
import { appCtx } from '../stores/appCtx'

setDefaultCtx(appCtx)

connectLogger(appCtx)
