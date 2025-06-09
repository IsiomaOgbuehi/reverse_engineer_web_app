export abstract class INetworkInterface<T> {
  abstract post(
    url: string,
    body: BodyInit | null,
    parsedHeaders?: HeadersInit
  ): Promise<T>
  abstract get(
    url: string,
    body: BodyInit | null,
    parsedHeaders?: HeadersInit
  ): Promise<T>
}
