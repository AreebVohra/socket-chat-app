import Request from "../network/request";
import { Endpoints } from "../constants/Endpoints";

export default class AuthService {
    Request = new Request();

    async LoginAsync(body) {
        try {
            return await this.Request.sendPostRequestAsync(Endpoints.login, body);
        } catch (error) {
            throw error;
        }
    }

    async RegisterAsync(body) {
        try {
            return await this.Request.sendPostRequestAsync(Endpoints.register, body);
        } catch (error) {
            throw error;
        }
    }
}