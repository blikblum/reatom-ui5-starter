import { LitElement, html, css } from 'lit'
import { BSHelpersCSS } from 'helpers/bootstrapCSS'
import { routerLinks } from 'slick-router/lit/routerLinks.js'

class AppShellPage extends LitElement {
  render() {
    return html`
      <ui5-navigation-layout>
        <ui5-shellbar
          slot="header"
          primary-title="Product Name"
          secondary-title="Second Title"
          notifications-count="1"
          show-notifications
        >
          <img slot="logo" src="https://sap.github.io/ui5-webcomponents/images/sap-logo-svg.svg" />
          <ui5-input slot="searchField"></ui5-input>
          <ui5-button icon="menu" slot="startButton" id="toggle"></ui5-button>
          <ui5-avatar slot="profile">
            <img src="https://sap.github.io/ui5-webcomponents/images/avatars/woman_avatar_5.png" />
          </ui5-avatar>
          <ui5-shellbar-item
            icon="source-code"
            text="Settings"
            title="Settings"
          ></ui5-shellbar-item>
          <ui5-shellbar-item icon="background" text="Settings" title="Settings"></ui5-shellbar-item>
          <ui5-shellbar-item
            icon="activity-assigned-to-goal"
            text="Settings"
            title="Settings"
          ></ui5-shellbar-item>
          <ui5-shellbar-item
            icon="action-settings"
            text="Settings"
            title="Settings"
          ></ui5-shellbar-item>
        </ui5-shellbar>

        <ui5-side-navigation slot="sideContent" ${routerLinks()}>
          <ui5-side-navigation-item text="Home" icon="home" route="home"></ui5-side-navigation-item>
          <ui5-side-navigation-item text="People" expanded icon="group">
            <ui5-side-navigation-sub-item text="From My Team"></ui5-side-navigation-sub-item>
            <ui5-side-navigation-sub-item text="From Other Team"></ui5-side-navigation-sub-item>
          </ui5-side-navigation-item>
          <ui5-side-navigation-item
            text="Settings"
            icon="locate-me"
            selected
            route="settings"
          ></ui5-side-navigation-item>
          <ui5-side-navigation-item text="Events" icon="calendar">
            <ui5-side-navigation-sub-item text="Local"></ui5-side-navigation-sub-item>
            <ui5-side-navigation-sub-item text="Others"></ui5-side-navigation-sub-item>
            <ui5-side-navigation-sub-item
              text="External Link"
              href="https://sap.com"
              target="_blank"
            >
            </ui5-side-navigation-sub-item>
          </ui5-side-navigation-item>
          <ui5-side-navigation-item slot="fixedItems" text="Useful Links" icon="chain-link">
            <ui5-side-navigation-sub-item
              text="External Link"
              href="https://sap.com"
              target="_blank"
            >
            </ui5-side-navigation-sub-item>
          </ui5-side-navigation-item>
          <ui5-side-navigation-item slot="fixedItems" text="History" icon="history">
          </ui5-side-navigation-item>
        </ui5-side-navigation>

        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </ui5-navigation-layout>
    `
  }

  static styles = [
    BSHelpersCSS,
    css`
      :host {
        height: 100vh;
        display: block;
      }

      ui5-shellbar {
        grid-column: 1 / span 2;
        grid-row: 1 / 2;
      }

      .content {
        padding: 1rem;
      }
    `,
  ]
}

customElements.define('app-shell-page', AppShellPage)

export { AppShellPage }
