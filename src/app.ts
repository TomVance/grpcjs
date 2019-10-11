import * as protoLoader from '@grpc/proto-loader'
import * as grpc from 'grpc'
import Service from './service'

interface InterfaceServerOptions {
  port?: number
  host?: string
}

export class App {
  public portNumber: number
  public hostAddress: string

  private services: Service[] = []
  private server: grpc.Server
  private packageDefinition: grpc.GrpcObject
  private packageName: string

  constructor(protobufFilePath: string, opts: InterfaceServerOptions) {
    this.portNumber = (opts && opts.port) || 50051
    this.hostAddress = (opts && opts.host) || '0.0.0.0'
    this.server = new grpc.Server()

    this.packageDefinition = grpc.loadPackageDefinition(
      protoLoader.loadSync(protobufFilePath, {
        defaults: true,
        enums: String,
        keepCase: true,
        longs: String,
        oneofs: true
      })
    )

    this.packageName = Object.keys(this.packageDefinition)[0]
  }

  public createService(serviceName: string): Service {
    const s: Service = new Service(serviceName, this.packageDefinition[this.packageName])
    this.services.push(s)

    return s
  }

  public serve(): void {
    this.applyServices()
    this.server.bind(`${this.hostAddress}:${this.portNumber}`, grpc.ServerCredentials.createInsecure())
    this.server.start()
  }

  private applyServices() {
    this.services.map(service => {
      this.server.addService(service.getProtoDefinition().service, service.getHandlers())
    })
  }
}

export default App
