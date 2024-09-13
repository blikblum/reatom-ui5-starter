import { unsafeCSS } from 'lit'
import gridCSS from 'bootstrap/scss/bootstrap-grid.scss?inline'
import utilitiesCSS from 'bootstrap/scss/bootstrap-utilities.scss?inline'

export const BSHelpersCSS = unsafeCSS(gridCSS + utilitiesCSS)
