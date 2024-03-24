import ApiHelper from "./ApiHelper";

class SinginService {

    static async Singin(body) {
        return ApiHelper.postAnonymous(`auth/login`, body);
    }
}

export default SinginService;