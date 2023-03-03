class Message {
  getDescription() {
    throw new Error("Unimplemented method getDescription()");
  }
}

class ErrorMessage extends Message {
  class = "error-message";
  constructor(name) {
    super();
    this._name = name;
  }
  getDescription() {
    return `Information of ${this._name} has already been removed from the server`;
  }
}

class DispatchMessage extends Message {
    class = "dispatch-message";
    constructor(name){
        super();
        this._name = name;
    }
    getDescription() {
        return `Added ${this._name}`;
    }
}

export { ErrorMessage, DispatchMessage };
