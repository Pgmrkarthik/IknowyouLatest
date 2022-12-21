import React, { useEffect, useState }  from 'react';
import { DataGrid, gridColumnVisibilityModelSelector } from '@mui/x-data-grid';
import { Switch } from '@mui/material';
import PropTypes from 'prop-types';

// 
import {AdminServices} from '../../../services/Admin.services';




TeacherList.propTypes={
  data: PropTypes.bool
}

function TeacherList(props) {
  const [rows, setRow] = useState([]);

    const getTableValue = ()=>{
        AdminServices.getAllTeachers().then((response)=>{
              console.log(response);
              setRow(response.Teachers);
        })

    }

   

   
    // const root="https://meindoc.app/"

    const columns =[
        { field: 'UserName', headerName: 'Name', width: 200 },
        { field: 'Email', headerName: 'EMAIL', width: 260 },
        { field: 'PhoneNumber', headerName: 'PHONENUMBER', width: 220 },
        { field: 'Status', headerName: 'ACTIVE', width: 100, renderCell:(params)=>{
          const StatusChange = () =>{
                AdminServices.ChangeStatus(params.id , params.value).then(value=>{
                  if(value.sucess===1){
                    params.value = 'ACTIVE';
                    getTableValue();
                  }
                },
                err=>{
                  console.log(err);
                })
          }
          return (
            <Switch  checked={params.value ==='ACTIVE' ? 1: 0} defaultChecked color={params.value ==='ACTIVE'?'success':'error'} onChange={StatusChange}/>
          );
      }}     
    ]

    useEffect(()=>{
        getTableValue();
    },[props.data]);
    

    return (
        <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight 
            />
        </div>
      );
}

export default TeacherList