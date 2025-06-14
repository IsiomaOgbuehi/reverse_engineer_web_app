import { getUsers } from './utils/api_utils/login/login.ts'
import NetworkProvider from './utils/network/network_providers/provider/provider.ts'
import FetchApi from './utils/network/network_providers/provider/provider_apis/fetch_api.ts'

class ReverseEngineering {
  public static init() {
    NetworkProvider.init(new FetchApi())
    getUsers()
  }
}
ReverseEngineering.init()
