import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import {config} from '../config';
import { handleResponse } from '../helpers/handle_response';
import { Role } from '../helpers/Role';
import { authenticationService } from './authservices';
import { authHeader } from '../helpers/authHeader';

export const PatAlongServices = {
    AddNewWordPatAlong,
    UpdatePatAlong,
    GetPatAlong,
    getPatAlongbyId,
    UpdateMarkers,
    DeletePatAlong
};

function AddNewWordPatAlong(){
    const requestOptions = { 
        method: 'post',
        headers:authHeader(),
    }
    return fetch(`${config.DP_ROOT_URL}/AddNewWordPatAlong.php`, requestOptions).then(handleResponse);
}

function UpdatePatAlong(){

}

function UpdateMarkers(patAlongId, Marker){
    console.log(patAlongId, Marker)
    if(authenticationService.currentUserValue){
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                id:patAlongId,
                Markers:Marker
            })
        };

        return fetch(`${config.DP_ROOT_URL}/UpdateMarkersPatAlong.php`, requestOptions).then(handleResponse);
}
}


function GetPatAlong(){
  return (authenticationService.currentUserValue.ApplicationUserRole === Role.ADMIN)?AdminPatAlong():TeacherPatAlong();
}

const TeacherPatAlong =()=>{
    if(authenticationService.currentUserValue){
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                ApplicationUserId:authenticationService.currentUserValue.ApplicationUserId
            })
        };

        return fetch(`${config.DP_ROOT_URL}/GetTeacherPatAlong.php`, requestOptions).then(handleResponse);
}
return [];

}

const AdminPatAlong=()=>{

    if(authenticationService.currentUserValue){
        const requestOptions = {
            method: 'GET',
        };

        return fetch(`${config.DP_ROOT_URL}/GetAllAdminPatAlong.php`, requestOptions).then(handleResponse);
        }
        return [];

}

function getPatAlongbyId(patAlongId){
     const requestOptions = {
        method: 'POST',
        body:JSON.stringify({
            id:patAlongId
        }),


    };
    return fetch(`${config.DP_ROOT_URL}/GetPatAlong.php`, requestOptions).then(handleResponse);
}

function DeletePatAlong(patAlongId){
    const requestOptions = {
        method: 'POST',
        body:JSON.stringify({
            id:patAlongId
        }),
        headers:authHeader(),

    };
    return fetch(`${config.DP_ROOT_URL}/DeletePatAlong.php`, requestOptions).then(handleResponse);
  
}