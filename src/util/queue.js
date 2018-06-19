const createQueue = () => {
  let isProcessing = true
  const queue = []

  const next = async () => {
    const callback = queue.shift()
    if (typeof callback === 'function') {    
      isProcessing = true
      await callback()
      await next()
    } else {
      isProcessing = false
    }
  }

  const push = (proc) => {
    queue.push(proc)

    if (isProcessing === false) {
      next()
    }
  }

  const start = () => {
    isProcessing = false
    next()
  }

  return { push, start }
}

const _single = createQueue()
module.exports = () => _single
