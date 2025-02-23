import { generalRequest } from '../utils/network';
import tokens from '../constants/tokens';

export function loginRequest(username, password) {
    return generalRequest({
        url: '/user/login',
        method: 'POST',
        data: { username, password },
    }).then((data) => {
        localStorage.setItem(tokens.auth_token, data.token);
    });
}

export function registerRequest(username, password, profileSummary) {
    return generalRequest({
        url: '/user/register',
        method: 'POST',
        data: { username, password, profileSummary },
    });
}
