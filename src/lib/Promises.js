class RejectedPromise extends Promise {
  constructor(reason) {
    return super((resolve, reject) => reject(reason));
  }
}

class ResolvedPromise extends Promise {
  constructor(reason) {
    return super((resolve, reject) => resolve(reason));
  }
}

export { RejectedPromise, ResolvedPromise };