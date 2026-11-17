type ActionResult<T> = {
  success: boolean
  data?: T
  message?: string
}

// Turns a server action's { success, data, message } into data or a thrown error,
export function unwrapResult<T>(result: ActionResult<T>, fallbackMessage: string): T {
  if (!result.success || result.data === undefined) {
    throw new Error(result.message ?? fallbackMessage)
  }
  return result.data
}