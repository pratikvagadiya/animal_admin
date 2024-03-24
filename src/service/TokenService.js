import jwt from 'jsonwebtoken';

export function GetCurrentLoggedUserDetails() {
    const userAccessToken = sessionStorage.getItem('user_token');
    if (userAccessToken) {
        return jwt.decode(userAccessToken.replace('Bearer ', ''));
    }
    return null;
}