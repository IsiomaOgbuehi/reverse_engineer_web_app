import { setCookies } from './utils/api_utils/cookies/set_cookies.ts';
import { loginUser } from './utils/api_utils/login/login.ts';
import getAllUsers from './utils/api_utils/users/get_all_users.ts';
import ApiConfig from './utils/network/api_config.ts';
import NetworkProvider from './utils/network/network_providers/provider/provider.ts';
import FetchApi from './utils/network/network_providers/provider/provider_apis/fetch_api.ts';

class ReverseEngineering {
    constructor() {}

    public static init(): void {
        NetworkProvider.init(new FetchApi());
    }

    public static async login(): Promise<void> {
        if(ApiConfig.getCookieExpires() > new Date()) {
            getAllUsers()
            return
        }
        console.log('NO COOKES SET, SETTING COOKIES')
        const response = await setCookies()
        if(response !== null) {
            loginUser()
        }
    }
}

ReverseEngineering.init()
ReverseEngineering.login()
