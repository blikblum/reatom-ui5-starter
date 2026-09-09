import { html, PropertyDeclarations } from 'lit'
import { appSessionAtom } from 'stores/appSession'
import { dispatchTask } from 'helpers/domTask'
import { Component } from 'helpers/component'

import './login-page.scss'

const isDev = import.meta.env.DEV

function demoCredentialsClick(e: Event) {
  e.preventDefault()
  const button = e.currentTarget as HTMLButtonElement
  const loginPage = button.closest('login-page') as LoginPage
  const email = loginPage.querySelector('#email') as HTMLInputElement
  const password = loginPage.querySelector('#password') as HTMLInputElement
  email.value = 'jon@hotmail.com'
  password.value = '123'
}

class LoginPage extends Component {
  static properties: PropertyDeclarations = {
    appSession: { attribute: false, store: appSessionAtom },
  }

  declare appSession: ReturnType<typeof appSessionAtom>

  signInClick(e: Event) {
    e.preventDefault()
    const email = this.querySelector('#email') as HTMLInputElement
    const password = this.querySelector('#password') as HTMLInputElement

    dispatchTask(this, 'sign-in', { user: email?.value, password: password?.value })
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
                ${
                  error
                    ? html`<ui5-form-item>
                        <ui5-message-strip design="Negative" hide-close-button
                          >${error}</ui5-message-strip
                        >
                      </ui5-form-item>`
                    : ''
                }
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
                ${isDev ? html`<ui5-button class="w-100 mt-2" @click=${demoCredentialsClick}>Use demo credentials</ui5-button>` : ''}
              </ui5-form>
            </ui5-busy-indicator>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('login-page', LoginPage)

export { LoginPage }
