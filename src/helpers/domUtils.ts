/**
 * Custom event class that extends the native Event class.
 * Allows additional parameters to be assigned to the event instance.
 *
 * @param type - The type of the event.
 * @param params - Additional parameters to assign to the event instance.
 */
class CustomDispatchEvent extends Event {
  constructor(type: string, params: Record<string, unknown> = {}) {
    super(type, { bubbles: true })
    Object.assign(this, params)
  }
}

/**
 * Creates an event instance based on the provided class or type.
 *
 * @param ClassOrType - Either a string representing the event type or a class extending Event.
 * @param arg - Optional arguments to pass to the event.
 * @returns An instance of the event.
 */
export function createEvent(
  ClassOrType: string | typeof Event,
  arg?: Record<string, unknown>,
): Event {
  if (typeof ClassOrType === 'string') {
    return new CustomDispatchEvent(ClassOrType, arg)
  } else {
    return new ClassOrType(arg ? JSON.stringify(arg) : '')
  }
}

/**
 * Creates a dispatcher function for a specific event type or class.
 *
 * @param EventClassOrType - Either a string representing the event type or a class extending Event.
 * @param argFn - Optional function to generate arguments for the event.
 * @returns A function that dispatches the event.
 */
export const createDispatcher = (
  EventClassOrType: string | typeof Event,
  argFn?: (context: { host: HTMLElement; event: Event }) => Record<string, unknown>,
): ((event: Event) => void) => {
  return function eventDispatcher(this: HTMLElement, event: Event): void {
    const arg = typeof argFn === 'function' ? argFn({ host: this, event }) : undefined
    const outEvent = createEvent(EventClassOrType, arg)
    event.stopPropagation()
    this.dispatchEvent(outEvent)
  }
}

/**
 * Creates a binder function to bind input values to a specific property.
 *
 * @param property - Optional property name to bind the value to.
 * @returns A function that binds the input value to the specified property.
 */
export function createValueBinder(property?: string): (e: Event) => void {
  return function valueBinder(this: Record<string, unknown>, e: Event): void {
    const target = e.target as HTMLInputElement
    const propName = property || target.dataset.property || target.name
    if (propName) {
      this[propName] = target.value
    }
  }
}
