class CustomDispatchEvent extends Event {
  constructor(type, params = {}) {
    super(type, { bubbles: true })
    Object.assign(this, params)
  }
}

export function createEvent(ClassOrType, arg) {
  return typeof ClassOrType === 'string'
    ? new CustomDispatchEvent(ClassOrType, arg)
    : new ClassOrType(arg)
}

export const createDispatcher = (EventClassOrType, argFn) => {
  return function eventDispatcher(event) {
    const arg = typeof argFn === 'function' ? argFn({ host: this, event }) : undefined
    const outEvent = createEvent(EventClassOrType, arg)
    event.stopPropagation()
    this.dispatchEvent(outEvent)
  }
}

export function createValueBinder(property) {
  return function valueBinder(e) {
    const propName = property ? property : e.target.dataset.property
    if (propName) {
      this[propName] = e.target.value
    }
  }
}
