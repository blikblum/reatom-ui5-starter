import { html } from 'lit'
import { Component } from 'helpers/component'
import { Router } from 'slick-router'
import { SideNavigationSelectionChangeEventDetail } from '@ui5/webcomponents-fiori/dist/SideNavigation.js'

function sideNavigationSelectionChange(
  this: AppShellPage,
  e: CustomEvent<SideNavigationSelectionChangeEventDetail>,
) {
  // manually handle navigation
  // remove when support to custom click events are fixed in router
  const { item } = e.detail
  const route = item.getAttribute('route')
  if (route) {
    this.$router.transitionTo(route)
  }
}

class AppShellPage extends Component {
  declare $router: Router

  render() {
    return html`
      <ui5-navigation-layout id="navigation-layout">
        <ui5-shellbar
          slot="header"
          id="shellbar"
          notifications-count="10"
          show-notifications
          show-product-switch
        >
          <ui5-shellbar-branding slot="branding"> VEGA CRM </ui5-shellbar-branding>
          <ui5-button
            id="menu-button"
            icon="menu2"
            slot="startButton"
            tooltip="Toggle side navigation"
          ></ui5-button>
          <ui5-tag design="Set2" color-scheme="7" slot="content" data-hide-order="2">Trial</ui5-tag>
          <ui5-text slot="content" data-hide-order="1">30 days remaining</ui5-text>

          <ui5-shellbar-spacer slot="content"></ui5-shellbar-spacer>

          <ui5-toggle-button icon="sap-icon://da" slot="assistant"></ui5-toggle-button>

          <ui5-shellbar-search
            slot="searchField"
            id="search-scope"
            scope-value="all"
            show-clear-icon
            placeholder="Search Apps, Products"
          >
            <ui5-search-scope text="All" value="all" slot="scopes"></ui5-search-scope>
            <ui5-search-scope text="Apps" value="apps" slot="scopes"></ui5-search-scope>
            <ui5-search-scope text="Products" value="products" slot="scopes"></ui5-search-scope>
          </ui5-shellbar-search>

          <ui5-shellbar-item icon="sys-help" text="Help"></ui5-shellbar-item>
          <ui5-avatar slot="profile">
            <img src="https://ui5.github.io/webcomponents/images/avatars/man_avatar_3.png" />
          </ui5-avatar>
        </ui5-shellbar>

        <ui5-user-menu
          id="userMenu"
          show-manage-account
          show-other-accounts
          show-edit-accounts
          show-edit-button
        >
          <ui5-user-menu-account
            slot="accounts"
            avatar-src="https://ui5.github.io/webcomponents/images/avatars/man_avatar_3.png"
            title-text="Alain Chevalier 1"
            subtitle-text="alian.chevalier@sap.com"
            description="Delivery Manager, SAP SE"
            selected
          >
          </ui5-user-menu-account>
          <ui5-user-menu-account
            slot="accounts"
            avatar-initials="SD"
            title-text="John Walker"
            subtitle-text="john.walker@sap.com"
            description="Project Manager"
          >
          </ui5-user-menu-account>
          <ui5-user-menu-account
            slot="accounts"
            avatar-initials="DS"
            title-text="David Wilson"
            subtitle-text="david.wilson@sap.com"
            description="Project Manager"
          >
          </ui5-user-menu-account>
          <ui5-user-menu-item
            icon="action-settings"
            text="Setting"
            data-id="setting"
          ></ui5-user-menu-item>
          <ui5-user-menu-item icon="official-service" text="Legal Information">
            <ui5-user-menu-item text="Terms of Use" data-id="terms-of-use"></ui5-user-menu-item>
            <ui5-user-menu-item text="Private Policy" data-id="privacy-policy"></ui5-user-menu-item>
          </ui5-user-menu-item>
          <ui5-user-menu-item
            icon="message-information"
            text="About"
            data-id="about"
          ></ui5-user-menu-item>
          <ui5-user-menu-item icon="globe" text="Language" data-id="single-select" show-selection>
            <ui5-user-menu-item-group check-mode="Single">
              <ui5-user-menu-item
                text="English"
                data-id="single-select-item1"
                checked
              ></ui5-user-menu-item>
              <ui5-user-menu-item text="Deutsch" data-id="single-select-item2"></ui5-user-menu-item>
            </ui5-user-menu-item-group>
          </ui5-user-menu-item>
        </ui5-user-menu>

        <ui5-side-navigation
          id="side-navigation"
          class="sideNavigation"
          slot="sideContent"
          accessible-name="Main"
          @selection-change=${sideNavigationSelectionChange}
        >
          <ui5-side-navigation-item text="Home" icon="home" route="home" selected></ui5-side-navigation-item>
          <ui5-side-navigation-item text="Favorites" expanded icon="favorite-list" unselectable>
            <ui5-side-navigation-sub-item text="Settings" route="settings" ></ui5-side-navigation-sub-item>
            <ui5-side-navigation-sub-item text="My Orders"></ui5-side-navigation-sub-item>
          </ui5-side-navigation-item>

          <ui5-side-navigation-item
            slot="fixedItems"
            id="quick-create"
            text="Quick Create"
            icon="add"
            design="Action"
            unselectable
          ></ui5-side-navigation-item>
          <ui5-side-navigation-item
            slot="fixedItems"
            text="Product Settings"
            icon="settings"
          ></ui5-side-navigation-item>
        </ui5-side-navigation>

        <div class="content p-3">
          <router-outlet></router-outlet>
        </div>
      </ui5-navigation-layout>
    `
  }
}

customElements.define('app-shell-page', AppShellPage)

export { AppShellPage }
