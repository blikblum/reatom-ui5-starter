import { LitElement } from 'lit'
import { withStore } from 'lit-reatom'

export class Component extends withStore(LitElement) {
  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this
  }
}
