import { authenticationService } from '../services/authservices';

function isJsonObject(strData) {
    try {
        JSON.parse(strData);
    } catch (e) {
        return false;
    }
    return true;
}

export function handleResponse(response) {
   //  console.log(response)
    if(response.data){
        return response.data;
    }
    return response.json().then(data => {
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}