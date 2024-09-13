import { LitElement, html, css } from 'lit'
import { BSHelpersCSS } from 'helpers/bootstrapCSS'

class SettingsPage extends LitElement {
  render() {
    return html` <div class="row">Settings!</div> `
  }

  static styles = [BSHelpersCSS, css``]
}

customElements.define('settings-page', SettingsPage)

export { SettingsPage }
