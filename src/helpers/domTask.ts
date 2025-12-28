type TaskMode = string

let defaultMode: TaskMode = 'block'

export function setDefaultTaskMode(mode: TaskMode): void {
  defaultMode = mode
}

// Event registry for type-safe event creation
// This should be extended via declaration merging in your app-specific files
// Example:
//   declare module './domTask' {
//     interface TaskEventRegistry {
//       'my-event': { params: { id: number }; returns: string }
//     }
//   }
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TaskEventRegistry {
  // Define your events here with their parameter types and return types
  // Format: 'event-name': { params: {...}, returns: ReturnType }
}

type EventConstructor<T = any> = new (params: T) => Event

// Type-safe overloads for string event names
// Overload for events with undefined params (params is optional)
export function createTaskEvent<K extends keyof TaskEventRegistry>(
  eventName: K extends keyof TaskEventRegistry
    ? TaskEventRegistry[K]['params'] extends undefined
      ? K
      : never
    : never,
  params?: undefined,
  mode?: TaskMode,
): TaskEvent<undefined, TaskEventRegistry[K]['returns']> & CustomEvent<undefined>

// Overload for events with defined params (params is required)
export function createTaskEvent<K extends keyof TaskEventRegistry>(
  eventName: K,
  params: TaskEventRegistry[K]['params'],
  mode?: TaskMode,
): TaskEvent<TaskEventRegistry[K]['params'], TaskEventRegistry[K]['returns']> &
  CustomEvent<TaskEventRegistry[K]['params']>

// For Event constructors
export function createTaskEvent<T, R = any>(
  ClassOrType: EventConstructor<T>,
  params: T,
  mode?: TaskMode,
): TaskEvent<T, R> & Event

// Implementation
export function createTaskEvent<T, R = any>(
  ClassOrType: string | EventConstructor<T>,
  params?: T,
  mode?: TaskMode,
): TaskEvent<T, R> {
  const event =
    typeof ClassOrType === 'string'
      ? new CustomEvent(ClassOrType, { detail: params, bubbles: true, composed: true })
      : new ClassOrType(params as T)
  ;(event as TaskEvent<T, R>).runMode = mode || defaultMode
  return event as TaskEvent<T, R>
}

export async function dispatchTask<T = any, R = any>(
  element: Element,
  event: TaskEvent<T, R>,
): Promise<R | undefined>

// Type-safe overloads for string event names
// Overload for events with undefined params (params is optional)
export async function dispatchTask<K extends keyof TaskEventRegistry>(
  element: Element,
  eventName: K extends keyof TaskEventRegistry
    ? TaskEventRegistry[K]['params'] extends undefined
      ? K
      : never
    : never,
  params?: undefined,
  mode?: TaskMode,
): Promise<TaskEventRegistry[K]['returns'] | undefined>

// Overload for events with defined params (params is required)
export async function dispatchTask<K extends keyof TaskEventRegistry>(
  element: Element,
  eventName: K,
  params: TaskEventRegistry[K]['params'],
  mode?: TaskMode,
): Promise<TaskEventRegistry[K]['returns'] | undefined>

// For Event constructors
export async function dispatchTask<T, R = any>(
  element: Element,
  ClassOrType: EventConstructor<T>,
  params: T,
  mode?: TaskMode,
): Promise<R | undefined>

// Implementation
export async function dispatchTask<T = any, R = any>(
  element: Element,
  eventOrType: TaskEvent<T, R> | string | EventConstructor<T>,
  params?: T,
  mode?: TaskMode,
): Promise<R | undefined> {
  const event =
    typeof eventOrType === 'string' || typeof eventOrType === 'function'
      ? (createTaskEvent<T, R>(eventOrType as any, params as T, mode) as TaskEvent<T, R>)
      : (eventOrType as TaskEvent<T, R>)

  element.dispatchEvent(event)
  if (!event.handled) {
    console.warn(`Event ${event.type} from ${element.tagName} not handled`)
  }
  return event.handled
}

type TaskRunner = (action: any) => any

const taskRunners: Record<string, TaskRunner> = {}

export function registerTaskRunner(runner: TaskRunner, mode: TaskMode): void {
  if (typeof runner !== 'function') {
    throw new Error('registerTaskRunner: runner should be a function')
  }
  taskRunners[mode] = runner
}

function noopRunner(action: any): any {
  return action
}

function getTaskRunner<T, R>(event: TaskEvent<T, R>): TaskRunner {
  return taskRunners[event.runMode] || taskRunners.default || noopRunner
}

function runEventHook<T, R>(
  event: TaskEvent<T, R>,
  hookName: 'done' | 'error',
  result?: any,
): void {
  const hook = event[hookName]
  if (typeof hook === 'function') {
    hook.call(event, result)
  }
}

const reservedEventKeys = ['isTrusted', '_constructor-name_', 'done', 'error']

export function getTaskParams<T>(event: TaskEvent<T>): T {
  return event instanceof CustomEvent
    ? event.detail
    : (Object.keys(event)
        .filter((key) => !reservedEventKeys.includes(key))
        .reduce((acc: Record<string, any>, key) => {
          acc[key] = (event as any)[key]
          return acc
        }, {}) as T)
}

export async function runTaskHandler<T, R>(
  this: any,
  event: TaskEvent<T, R>,
  handler: TaskHandlerFunction<T, R>,
): Promise<R> {
  const task = Promise.resolve(handler.call(this, getTaskParams(event)))
  event.handled = task
  return await task
}

type TaskHandlerFunction<T = any, R = any> = (params: T) => Promise<R> | R

export function createTaskHandler<T = any, R = any>(
  handler: TaskHandlerFunction<T, R>,
  thisArg?: any,
): (event: Event) => Promise<void> {
  return async function taskHandlerEvent(this: any, event: Event): Promise<void> {
    const taskEvent = event as TaskEvent<T, R>
    taskEvent.stopPropagation()
    try {
      const params = getTaskParams(taskEvent)
      const runner = getTaskRunner(taskEvent)
      const task = runner(handler.call(thisArg || this, params))
      taskEvent.handled = task
      const result = await task

      runEventHook(taskEvent, 'done', result)
    } catch (error) {
      runEventHook(taskEvent, 'error', error)
    }
  }
}

// decorator

const ensureClassProperty = (ctor: any, prop: string): any[] => {
  // eslint-disable-next-line no-prototype-builtins
  if (!ctor.hasOwnProperty(prop)) {
    const superProperties = Object.getPrototypeOf(ctor)[prop]
    ctor[prop] = superProperties ? [...superProperties] : []
  }
  return ctor[prop]
}

interface TaskHandlerEntry {
  eventName: string
  method: TaskHandlerFunction
}

const registerClassTaskHandler = (
  ctor: any,
  eventName: string,
  method: TaskHandlerFunction,
): void => {
  const taskHandlers: TaskHandlerEntry[] = ensureClassProperty(ctor, '__taskHandlers')
  taskHandlers.push({ eventName, method })
}

// TypeScript decorator types
type LegacyDecorator = (
  protoOrDescriptor: any,
  methodName?: string,
  propertyDescriptor?: PropertyDescriptor,
) => void

// Type-safe decorator overloads
export function taskHandler<K extends keyof TaskEventRegistry>(eventName: K): LegacyDecorator
export function taskHandler<T = any>(
  handler: TaskHandlerFunction<T>,
): (event: Event) => Promise<void>
export function taskHandler<T = any>(
  eventNameOrFunction: string | TaskHandlerFunction<T>,
): LegacyDecorator | ((event: Event) => Promise<void>) {
  if (typeof eventNameOrFunction === 'function') {
    return createTaskHandler(eventNameOrFunction)
  }
  return (
    protoOrDescriptor: any,
    _methodName?: string,
    propertyDescriptor?: PropertyDescriptor,
  ) => {
    // legacy decorator spec
    registerClassTaskHandler(
      protoOrDescriptor.constructor,
      eventNameOrFunction,
      propertyDescriptor!.value,
    )
  }
}

export function bindClassTasks(instance: any): void {
  const ctor = instance.constructor
  const taskHandlers: TaskHandlerEntry[] | undefined = ctor.__taskHandlers
  if (taskHandlers) {
    for (const { eventName, method } of taskHandlers) {
      const handler = createTaskHandler(method, instance)
      document.body.addEventListener(eventName, handler)
    }
  }
}

// Type-safe registerTaskHandler
export function registerTaskHandler<K extends keyof TaskEventRegistry>(
  eventName: K,
  handler: TaskHandlerFunction<TaskEventRegistry[K]['params'], TaskEventRegistry[K]['returns']>,
  element?: Element | Document,
): void
export function registerTaskHandler<T = any, R = any>(
  eventName: string,
  handler: TaskHandlerFunction<T, R>,
  element?: Element | Document,
): void
export function registerTaskHandler<T = any, R = any>(
  eventName: string,
  handler: TaskHandlerFunction<T, R>,
  element: Element | Document = document.body,
): void {
  element.addEventListener(eventName, createTaskHandler(handler))
}

// Extend Event interface to add task-related properties
export interface TaskEvent<T = any, R = any> extends Event {
  runMode: TaskMode
  handled?: Promise<R>
  done?: (result: R) => void
  error?: (error: any) => void
  detail?: T
}
