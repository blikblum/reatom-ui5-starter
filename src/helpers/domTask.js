let defaultMode = 'block'

export function setDefaultTaskMode(mode) {
  defaultMode = mode
}

export function createTaskEvent(ClassOrType, params, mode) {
  const event =
    typeof ClassOrType === 'string'
      ? new CustomEvent(ClassOrType, { detail: params, bubbles: true })
      : new ClassOrType(params)
  event.runMode = mode || defaultMode
  return event
}

export async function dispatchTask(element, event) {
  element.dispatchEvent(event)
  if (!event.task) {
    console.warn(`Event ${event.type} from ${element.tagName} not handled`)
  }
  return event.task
}

const taskRunners = {}

export function registerTaskRunner(runner, mode) {
  if (typeof runner !== 'function') {
    throw new Error('registerTaskRunner: runner should be a function')
  }
  taskRunners[mode] = runner
}

function noopRunner(action) {
  return action
}

function getTaskRunner(event) {
  return taskRunners[event.runMode] || taskRunners.default || noopRunner
}

function runEventHook(event, hookName, result) {
  const hook = event[hookName]
  if (typeof hook === 'function') {
    hook.call(event, result)
  }
}

const reservedEventKeys = ['isTrusted', '_constructor-name_', 'done', 'error']

export function getTaskParams(event) {
  return (
    event.detail ||
    Object.keys(event)
      .filter((key) => !reservedEventKeys.includes(key))
      .reduce((acc, key) => {
        acc[key] = event[key]
        return acc
      }, {})
  )
}

export async function runTaskHandler(event, handler) {
  const task = handler.call(this, getTaskParams(event))
  event.task = task
  return await task
}

export function createTaskHandler(handler, thisArg) {
  return async function taskHandlerEvent(event) {
    event.stopPropagation()
    try {
      const params = getTaskParams(event)
      const runner = getTaskRunner(event)
      const task = runner(handler.call(thisArg || this, params))
      event.task = task
      const result = await task

      runEventHook(event, 'done', result)
    } catch (error) {
      runEventHook(event, 'error', error)
    }
  }
}

// decorator

const ensureClassProperty = (ctor, prop) => {
  // eslint-disable-next-line no-prototype-builtins
  if (!ctor.hasOwnProperty(prop)) {
    const superProperties = Object.getPrototypeOf(ctor)[prop]
    ctor[prop] = superProperties ? [...superProperties] : []
  }
  return ctor[prop]
}

const registerClassTaskHandler = (ctor, eventName, method) => {
  const taskHandlers = ensureClassProperty(ctor, '__taskHandlers')
  taskHandlers.push({ eventName, method })
}

export function taskHandler(eventNameOrFunction) {
  if (typeof eventNameOrFunction === 'function') {
    return createTaskHandler(eventNameOrFunction)
  }
  return (protoOrDescriptor, methodName, propertyDescriptor) => {
    if (typeof methodName !== 'string') {
      const { kind, key, placement, descriptor, initializer } = protoOrDescriptor
      return {
        kind,
        placement,
        descriptor,
        initializer,
        key,
        finisher(ctor) {
          registerClassTaskHandler(ctor, eventNameOrFunction, descriptor.value)
        },
      }
    }
    // legacy decorator spec
    registerClassTaskHandler(
      protoOrDescriptor.constructor,
      eventNameOrFunction,
      propertyDescriptor.value,
    )
  }
}

export function bindClassTasks(instance) {
  const ctor = instance.constructor
  const taskHandlers = ctor.__taskHandlers
  if (taskHandlers) {
    for (const { eventName, method } of taskHandlers) {
      const handler = createTaskHandler(method, instance)
      document.body.addEventListener(eventName, handler)
    }
  }
}

export function registerTaskHandler(eventName, handler, element = document.body) {
  element.addEventListener(eventName, createTaskHandler(handler))
}
