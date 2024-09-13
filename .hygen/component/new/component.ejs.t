---
to: <%- path%><%- tagName %>.ts
---
import { LitElement, html, css } from 'lit'
import { BSHelpersCSS } from 'helpers/bootstrapCSS'

class <%- componentName %> extends LitElement {

  render () {
    return html`
      <div class="row">      
        Hello!
      </div>
    `
  }

   static styles = [BSHelpersCSS, css``]
}

customElements.define('<%- tagName %>', <%- componentName %>)

export { <%- componentName %> }

