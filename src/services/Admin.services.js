
import axios from 'axios';
import { id } from 'date-fns/locale';
import {config} from '../config';
import { authHeader} from '../helpers/authHeader';
import { handleResponse } from '../helpers/handle_response';


export const AdminServices = {
    AddAdmin,
    getAllAdminUsers,
    AddTeacher,
    AddWorker,
    getAllTeachers,
    getAllWorker,
    ChangeStatus

}

// function AddHospital(values){
//     const formData = new FormData();
//         formData.append("logo",values.logo);
//         formData.append('name',values.name); 
//         formData.append('mail',values.email);
//         formData.append('mobile',values.mobile)
//         formData.append('appid',process.env.REACT_APP_ID);
//         return axios({
//             method: "POST",
//             url: `${config.DP_ROOT_URL}/addHospital.php`,
//             data: formData,
//             headers:authHeader(),
//         }).then((response)=> response.data);
// }

function AddTeacher(Values){
    console.log(Values);
    const requestOptions = { 
        method: 'post',
        headers:authHeader(),
        body:JSON.stringify(Values)
    }
    return fetch(`${config.DP_ROOT_URL}/Teacher/RegisterTeacher.php`, requestOptions).then(handleResponse);
}

function AddWorker(Values){
    const requestOptions = { 
        method: 'post',
        headers:authHeader(),
        body:JSON.stringify(Values)
    }
    return fetch(`${config.DP_ROOT_URL}/addWorker.php`, requestOptions).then(handleResponse);
}

// function getAllHospital(){

//     const requestOptions = { 
//         method: 'get',
//         headers:authHeader(),
      
//     }
//      return fetch(`${config.DP_ROOT_URL}/get_hospitals.php`, requestOptions).then(handleResponse);
// }


function getAllTeachers(){
    const requestOptions = { 
        method: 'get',
        headers:authHeader(),
      //  body:JSON.stringify(requestData)
    }
    return fetch(`${config.DP_ROOT_URL}/GetAllTeachers.php`, requestOptions).then(handleResponse);

}
function getAllWorker(){

    const requestOptions = { 
        method: 'get',
        headers:authHeader(),
      //  body:JSON.stringify(requestData)
    }
    return fetch(`${config.DP_ROOT_URL}/getAllWorkers.php`, requestOptions).then(handleResponse);

}


// Admin users
// Add admin users
function AddAdmin(Values){
    const requestOptions = { 
        method: 'post',
        headers:authHeader(),
        body:JSON.stringify(Values)
    }
    return fetch(`${config.DP_ROOT_URL}/SuperAdmin/Register.php`, requestOptions).then(handleResponse);


}

// get all admin users

function getAllAdminUsers(){

    const requestOptions = { 
        method: 'get',
        headers:authHeader(),
        // body:JSON.stringify(requestData)
    }
    return fetch(`${config.DP_ROOT_URL}/GetAllSuperAdmin.php`, requestOptions).then(handleResponse);

}

function ChangeStatus(id,status){
    
    const Values = {
        UserId : id,
        Status : status
    }
    console.log(Values)
    const requestOptions = { 
        method: 'post',
        headers:authHeader(),
        body:JSON.stringify(Values)
    }
    return fetch(`${config.DP_ROOT_URL}/UpdateStatus.php`, requestOptions).then(handleResponse);
}