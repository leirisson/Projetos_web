export type FetchOptions = RequestInit & { timeoutMs?: number }

export async function fetchWithTimeout(input: RequestInfo, init: FetchOptions = {}): Promise<Response> {
  const { timeoutMs = 12000, ...options } = init
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(input, { ...options, signal: controller.signal })
    return res
  } catch (err: any) {
    if (controller.signal.aborted) {
      err.name = err.name || 'AbortError'
      err.message = err.message || 'Request aborted due to timeout'
    }
    throw err
  } finally {
    clearTimeout(timer)
  }
}
