import ApiHelper from "./ApiHelper";

class AllWallpaperTypeService {

    static async GetAllWallpaperType(body, abortController) {
        return ApiHelper.getAnonymous("wallpapertype", body, abortController);
    }
    static async DeleteWallpaper(id) {
        return ApiHelper.deleteAnonymous(`wallpapertype/${id}`);
    }
    static async AddWallpaper(body) {
        return ApiHelper.postAnonymous(`wallpapertype`, body);
    }
    static async UpdateWallpaper(body) {
        return ApiHelper.putAnonymous(`wallpapertype`, body);
    }
    static async GetMainWallpaperById(id) {
        return ApiHelper.getAnonymous(`wallpapertype/${id}`);
    }
}

export default AllWallpaperTypeService;