export abstract class INetworkInterface<T> {
  abstract post(url: string, body: BodyInit | null): Promise<T>
  abstract get(url: string, body: BodyInit | null): Promise<T>
}