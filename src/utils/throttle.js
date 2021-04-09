/**
 * Returns a new function that, when invoked, invokes `func` at most once per `wait` milliseconds.
 *
 * @param {Function} func Function to wrap.
 * @param {Number} wait Number of milliseconds that must elapse between `func` invocations.
 * @return {Function} A new function that wraps the `func` function passed in.
 */

function throttle (func, wait) {
  let ctx, args, rtn, timeoutID // caching
  let last = 0

  return function throttled () {
    ctx = this
    args = arguments
    const delta = new Date() - last
    if (!timeoutID) {
      if (delta >= wait) call()
      else timeoutID = setTimeout(call, wait - delta)
    }
    return rtn
  }

  function call () {
    timeoutID = 0
    last = +new Date()
    rtn = func.apply(ctx, args)
    ctx = null
    args = null
  }
}

export default throttle
