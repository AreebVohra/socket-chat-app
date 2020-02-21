import Request from "../network/request";
import EndPoints from "../constants/Endpoints";

export default class AuthService {
    Request = new Request();

    async LoginAsync(body) {
        try {
            return await this.Request.sendPostRequestAsync(EndPoints.login, body);
        } catch (error) {
            throw error;
        }
    }
}