import { LitElement, html, css, PropertyDeclarations } from 'lit'
import { BSHelpersCSS } from 'helpers/bootstrapCSS'
import { withStore } from 'lit-reatom'
import { appSessionAtom } from 'stores/appSession'

class LoginPage extends withStore(LitElement) {
  static properties: PropertyDeclarations = {
    appSession: { attribute: false, store: appSessionAtom },
  }

  declare appSession: ReturnType<typeof appSessionAtom>

  signInClick(e: Event) {
    e.preventDefault()
    const email = this.shadowRoot?.getElementById('email') as HTMLInputElement
    const password = this.shadowRoot?.getElementById('password') as HTMLInputElement

    this.dispatchEvent(
      new CustomEvent('sign-in', {
        detail: { email: email?.value, password: password?.value },
        bubbles: true,
      }),
    )
  }

  render() {
    const { error, isSigning } = this.appSession
    return html`
      <div class="container">
        <div class="row">
          <div class="col-lg-4 offset-lg-4 col-md-6 offset-md-3">
            <ui5-busy-indicator delay="0" ?active=${isSigning}>
              <ui5-form
                header-text="Login"
                layout="S1 M1 L1 XL1"
                label-span="S12 M12 L12 XL12"
                class="w-100"
              >
                ${error
                  ? html`<ui5-form-item>
                      <ui5-message-strip design="Negative" hide-close-button
                        >${error}</ui5-message-strip
                      >
                    </ui5-form-item>`
                  : ''}
                <ui5-form-item>
                  <ui5-label for="email" slot="labelContent">Email:</ui5-label>
                  <ui5-input type="Email" id="email"></ui5-input>
                </ui5-form-item>
                <ui5-form-item>
                  <ui5-label for="password" slot="labelContent">Senha:</ui5-label>
                  <ui5-input type="Password" id="password"></ui5-input>
                </ui5-form-item>

                <ui5-form-item>
                  <ui5-button class="w-100" design="Emphasized" @click=${this.signInClick}
                    >Entrar</ui5-button
                  >
                </ui5-form-item>
                <ui5-text>Try jon@hotmail.com with password 123</ui5-text>
              </ui5-form>
            </ui5-busy-indicator>
          </div>
        </div>
      </div>
    `
  }

  static styles = [
    BSHelpersCSS,
    css`
      :host {
        height: 100vh;
        display: flex;
        align-items: center;
      }

      ui5-busy-indicator {
        display: contents;
      }
    `,
  ]
}

customElements.define('login-page', LoginPage)

export { LoginPage }
