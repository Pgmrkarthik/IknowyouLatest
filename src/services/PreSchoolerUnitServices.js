import { authHeader } from '../helpers/authHeader';
import { handleResponse } from '../helpers/handle_response';
import {config} from '../config';
import { authenticationService } from './authservices';

export const PreSchoolerServices = {
    AddPreSchoolerUnits,
    GetAllUnits,
    RemovePreSchoolerUnit,
    GetUnitScripts,
    GetQuestions,
    GetAllQuestions,
    UpdateAnswer,
    DeleteQuestion,
    GetImageGallery,
}

function AddPreSchoolerUnits(Values){
    const requestOptions = { 
        method: 'post',
        headers:authHeader(),
        body:JSON.stringify(Values)
    }
    return fetch(`${config.DP_ROOT_URL}/PreSchooler/Units/Add.php`, requestOptions).then(handleResponse);
}

function GetAllUnits() {
    const requestOptions = {
        method: 'get',
        headers:authHeader()
    };
    return fetch(`${config.DP_ROOT_URL}/GetAllPreSchoolerUnit.php`, requestOptions).then(handleResponse); 
}

function RemovePreSchoolerUnit(Values) {
    console.log(Values);
    const requestOptions = {
        method: 'Post',
        headers:authHeader(),
        body:JSON.stringify(Values)
    };
    return fetch(`${config.DP_ROOT_URL}/DeletePreschooler.php`, requestOptions).then(handleResponse); 
}

function GetUnitScripts(Unitid) {
    const requestOptions = {
        method: 'post',
        headers:authHeader(),
        body:JSON.stringify({UnitId:Unitid})
    };
    return fetch(`${config.DP_ROOT_URL}/GetPreSchoolerUnitScripts.php`, requestOptions).then(handleResponse); 
}

function GetQuestions(QID) {
    const requestOptions = {
        method: 'post',
        headers:authHeader(),
        body:JSON.stringify({id:QID})
    };
    return fetch(`${config.DP_ROOT_URL}/GetQuestionDetails.php`, requestOptions).then(handleResponse); 
}


function GetAllQuestions(SID) {
    const requestOptions = {
        method: 'post',
        headers:authHeader(),
        body:JSON.stringify({scriptid:SID})
    };
    return fetch(`${config.DP_ROOT_URL}/GetAllQuestionsByScriptid.php`, requestOptions).then(handleResponse); 
}

function UpdateAnswer(QID,AnswerImageId){
    const requestOptions = {
        method: 'post',
        headers:authHeader(),
        body:JSON.stringify({id:QID, ImageId:AnswerImageId})
    };
    return fetch(`${config.DP_ROOT_URL}/UpdateAnswers.php`, requestOptions).then(handleResponse); 

}



// function GetAllPreSchoolers() {
//     const requestOptions = {
//         method: 'GET',
//         headers:authHeader(),
//         body:JSON.stringify({scriptid:SID})
//     };
//     return fetch(`${config.DP_ROOT_URL}/GET.php`, requestOptions).then(handleResponse); 
// }


function DeleteQuestion(QID){

    const requestOptions = {
        method: 'post',
        headers:authHeader(),
        body:JSON.stringify({id:QID})
    };
    return fetch(`${config.DP_ROOT_URL}/DeleteQuestion.php`, requestOptions).then(handleResponse); 

}

function GetImageGallery() {
    const requestOptions = {
        method: 'get',
        headers:authHeader()
    };
    return fetch(`${config.DP_ROOT_URL}/GETALLIMAGEGALLERY.php`, requestOptions).then(handleResponse); 
}
