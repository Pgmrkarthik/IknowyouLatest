
import { authHeader } from '../helpers/authHeader';
import { handleResponse } from '../helpers/handle_response';
import {config} from '../config';
import { authenticationService } from './authservices';

export const BabyUnitServices = {
    AddNewBabyUnit,
    AddNewBabyUnitQuestion,
    GetBabyUnit, 
    GetAllBabyUnit,
    UpdateBabyUnit,
    GetBabyUnitQuestions,
    GetBabyUnitQuestion,
    UpdateMarkers,
    UpdateSoundMarkers,
    DeleteBabyUnit,
    DeleteBabyUnitQuestion
    
}

function AddNewBabyUnit(){
    const requestOptions = { 
        method: 'post',
        headers:authHeader(),
    }
    return fetch(`${config.DP_ROOT_URL}/AddNewBabyUnit.php`, requestOptions).then(handleResponse);
}


function AddNewBabyUnitQuestion(babyUnitId){
    const requestOptions = { 
        method: 'post',
        headers:authHeader(),
        body:JSON.stringify({
            BabyUnitId:babyUnitId
        })
    }
    return fetch(`${config.DP_ROOT_URL}/AddNewBabyUnitQuestion.php`, requestOptions).then(handleResponse);
}

function GetBabyUnit(babyUnitId){

    const requestOptions = {
        method: 'post',
        headers:authHeader(),
        body:JSON.stringify({
            id:babyUnitId
        })

    };
    return fetch(`${config.DP_ROOT_URL}/GetBabyUnit.php`, requestOptions).then(handleResponse);   
}

function DeleteBabyUnit(babyUnitId){
    const requestOptions = {
        method: 'post',
        headers:authHeader(),
        body:JSON.stringify({
            id:babyUnitId
        })

    };
    return fetch(`${config.DP_ROOT_URL}/DeleteBabyUnit.php`, requestOptions).then(handleResponse);   
}
function DeleteBabyUnitQuestion(BUID,babyUnitQuestionId){
    const requestOptions = {
        method: 'post',
        headers:authHeader(),
        body:JSON.stringify({
            id:babyUnitQuestionId,
            BabyUnitId:BUID
        })
    };
    return fetch(`${config.DP_ROOT_URL}/DeleteBabyUnitQuestion.php`, requestOptions).then(handleResponse);   
}



function GetAllBabyUnit(){

    const requestOptions = {
        method: 'get',
        headers:authHeader()
    };
    return fetch(`${config.DP_ROOT_URL}/GetAllBabyUnit.php`, requestOptions).then(handleResponse);
    
}
function UpdateBabyUnit(){
    
}


function GetBabyUnitQuestions(BabyUnitId) {

    const requestOptions = {
        method: 'post',
        headers:authHeader(),
        body:JSON.stringify({
            id:BabyUnitId
        })

    };
    return fetch(`${config.DP_ROOT_URL}/GetBabyUnitQuestions.php`, requestOptions).then(handleResponse);

}

function GetBabyUnitQuestion(BabyUnitQuestionId){
    const requestOptions = {
        method: 'post',
        headers:authHeader(),
        body:JSON.stringify({
            id:BabyUnitQuestionId
        })

    };
    return fetch(`${config.DP_ROOT_URL}/GetBabyUnitQuestion.php`, requestOptions).then(handleResponse);
    

}

function UpdateMarkers(BabyUnitId, Marker){
    console.log(BabyUnitId, Marker)
    if(authenticationService.currentUserValue){
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                id:BabyUnitId,
                Markers:Marker
            })
        };

        return fetch(`${config.DP_ROOT_URL}/UpdateVMBabyUnitQ.php`, requestOptions).then(handleResponse);
}
}

function UpdateSoundMarkers(BabyUnitId, Marker){
    console.log(BabyUnitId, Marker)
    if(authenticationService.currentUserValue){
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                id:BabyUnitId,
                Markers:Marker
            })
        };

        return fetch(`${config.DP_ROOT_URL}/UpdateSMBabyUnitQ.php`, requestOptions).then(handleResponse);
}
}




