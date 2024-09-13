import { LitElement, html, css } from 'lit'
import { BSHelpersCSS } from 'helpers/bootstrapCSS'

class AppShellPage extends LitElement {
  render() {
    return html`
      <div class="tool-layout h-100">
        <ui5-shellbar
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
        <router-links>
          <ui5-side-navigation>
            <ui5-side-navigation-item
              text="Home"
              icon="home"
              route="home"
            ></ui5-side-navigation-item>
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
        </router-links>
        <div class="content container">
          <router-outlet></router-outlet>
        </div>
      </div>
    `
  }

  static styles = [
    BSHelpersCSS,
    css`
      :host {
        height: 100vh;
        display: block;
      }

      .shell-content {
        height: calc(100% - var(--_ui5_shellbar_root_height));
      }

      ui5-shellbar::part(root) {
        padding-inline-start: 0.75rem;
        padding-inline-end: 1.25rem;
        border-radius: 0.5rem;
        box-shadow:
          0 0 0.125rem 0 color-mix(in srgb, var(--sapContent_ShadowColor) 16%, transparent),
          0 0.5rem 1rem 0 color-mix(in srgb, var(--sapContent_ShadowColor) 16%, transparent);
      }

      .tool-layout {
        padding: 0.5rem 0.5rem 0 0.5rem;
        background: color-mix(in srgb, black 4%, var(--sapBackgroundColor));
        display: grid;
        gap: 0.5rem;
        grid-template-rows: auto 1fr;
        grid-template-columns: auto 1fr;
      }

      ui5-shellbar {
        grid-column: 1 / span 2;
        grid-row: 1 / 2;
      }

      .content {
        position: relative;
        background: var(--sapBackgroundColor);
        border-radius: 0.5rem 0.5rem 0 0;
        box-shadow:
          0 0 0.125rem 0 color-mix(in srgb, var(--sapContent_ShadowColor) 16%, transparent),
          0 0.5rem 1rem 0 color-mix(in srgb, var(--sapContent_ShadowColor) 16%, transparent);
      }
    `,
  ]
}

customElements.define('app-shell-page', AppShellPage)

export { AppShellPage }
