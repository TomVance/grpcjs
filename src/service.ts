interface InterfaceHandlerHash {
  [key: string]: (...args: any) => any
}

interface RawGRPCRequest {
  request: any
}

export class Service {
  public name: string

  private definition: any
  private handlers: InterfaceHandlerHash = {}

  constructor(name: string, serviceDefinition: any) {
    this.name = name
    this.definition = serviceDefinition[name]
  }

  public getProtoDefinition() {
    return this.definition
  }

  public getHandlers(): InterfaceHandlerHash {
    return this.handlers
  }

  public on(methodName: string, handler: () => any) {
    this.handlers[methodName] = this.interceptHandler(handler)
  }

  private interceptHandler(clientHandler: (...args: any) => any) {
    return (call: RawGRPCRequest, callback: (...args: any) => any): any => {
      clientHandler(call.request)
        .then((result: any) => {
          return callback(null, result)
        })
        .catch((err: Error) => {
          return callback(err)
        })
    }
  }
}

export default Service
