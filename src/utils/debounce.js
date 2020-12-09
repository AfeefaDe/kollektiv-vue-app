let timeout = null

export async function debounce (callback, delay = 300) {
  if (timeout) {
    clearTimeout(timeout)
  }

  timeout = setTimeout(() => {
    clearTimeout(timeout)
    callback()
  }, delay)
}
