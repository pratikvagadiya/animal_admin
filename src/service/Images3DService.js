import ApiHelper from "./ApiHelper";

class Images3DService {

    static async GetAll3DWallpaper(body, abortController) {
        return ApiHelper.getAnonymous("threedwallpaper", body, abortController);
    }
    static async Delete3DWallpaper(id) {
        return ApiHelper.deleteAnonymous(`threedwallpaper/${id}`);
    }
    static async Add3DWallpaper(body) {
        return ApiHelper.postAnonymous(`threedwallpaper`, body);
    }
    static async Update3DWallpaper(body) {
        return ApiHelper.putAnonymous(`threedwallpaper`, body);
    }
    static async Get3DWallpaperById(id) {
        return ApiHelper.getAnonymous(`threedwallpaper/${id}`);
    }
}

export default Images3DService;