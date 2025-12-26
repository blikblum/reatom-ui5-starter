import { LitElement, html, css } from 'lit'
import { BSHelpersCSS } from 'helpers/bootstrapCSS'

class HomePage extends LitElement {
  render() {
    return html`
      <div class="container-fluid">
        <div class="row">Home!</div>
      </div>
    `
  }

  static styles = [BSHelpersCSS, css``]
}

customElements.define('home-page', HomePage)

export { HomePage }
