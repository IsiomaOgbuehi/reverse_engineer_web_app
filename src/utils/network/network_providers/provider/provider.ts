import { INetworkInterface } from "../types/network_interface.ts"

class NetworkProvider implements INetworkInterface<Response> {
  private networkInterface!: INetworkInterface<Response>
  private static _instance: NetworkProvider | null = null

  private constructor() {}

  public static init(networkInterface: INetworkInterface<Response>): void {
    if (!this._instance) {
      const instance = new NetworkProvider()
      instance.networkInterface = networkInterface
      this._instance = instance
    }
  }

  public static get instance(): NetworkProvider {
    if (!this._instance) {
      throw new Error("NetworkProvider instance is not initialized.")
    }
    return this._instance
  }
  public post(url: string, body: BodyInit | null): Promise<Response> {
    return this.networkInterface.post(url, body)
  }

  public get(url: string, body: BodyInit | null): Promise<Response> {
    return this.networkInterface.get(url, body)
  }
}

export default NetworkProvider
