import { html } from 'lit'
import { Component } from 'helpers/component'

class SettingsPage extends Component {
  render() {
    return html`
      <div class="container-fluid">
        <div class="row">Settings!</div>
      </div>
    `
  }
}

customElements.define('settings-page', SettingsPage)

export { SettingsPage }
