import { Atom } from '@reatom/core'

declare module 'lit' {
  interface PropertyDeclaration {
    store?: Atom
  }
}
