import ApiHelper from "./ApiHelper";

class Images2DService {

    static async GetAll2DWallpaper(body) {
        return ApiHelper.getAnonymous("twodwallpaper", body);
    }
    static async Delete2DWallpaper(id) {
        return ApiHelper.deleteAnonymous(`twodwallpaper/${id}`);
    }
    static async Add2DWallpaper(body) {
        return ApiHelper.postAnonymous(`twodwallpaper`, body);
    }
    static async Update2DWallpaper(body) {
        return ApiHelper.putAnonymous(`twodwallpaper`, body);
    }
    static async Get2DWallpaperById(id) {
        return ApiHelper.getAnonymous(`twodwallpaper/${id}`);
    }
}

export default Images2DService;