import ApiHelper from "./ApiHelper";

class AuthService {
    static async SignIn(body) {
        return ApiHelper.postAnonymous("user/login", body);
    }
}
export default AuthService;