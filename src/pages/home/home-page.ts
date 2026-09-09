import { html } from 'lit'

import { Component } from 'helpers/component'

class HomePage extends Component {
  render() {
    return html` <div class="container-fluid">
      <div class="row">Home!</div>
    </div>`
  }
}

customElements.define('home-page', HomePage)

export { HomePage }
