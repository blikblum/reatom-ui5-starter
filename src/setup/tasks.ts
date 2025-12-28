// Extend the TaskEventRegistry with app-specific events via declaration merging
declare module '../helpers/domTask' {
  interface TaskEventRegistry {
    login: { params: { user: string; password: string }; returns: void }
  }
}

// Export an empty object to make this a module
export {}
