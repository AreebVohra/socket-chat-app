import AuthService from '../services/AuthService';


export default class AuthController {
    AuthService = new AuthService();

    async LoginAsync(body) {
        try {
            const response = await this.AuthService.LoginAsync(body);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async RegisterAsync(body) {
        try {
            const response = await this.AuthService.RegisterAsync(body);
            return response;
        } catch (error) {
            throw error;
        }
    }
}