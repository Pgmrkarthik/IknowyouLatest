import React, { useEffect, useState }  from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { Switch } from '@mui/material';

// 
import {AdminServices} from '../../../services/Admin.services';

AdminUserList.propTypes={
  data: PropTypes.bool
}

function AdminUserList(props) {
  const [rows, setRow] = useState([]);
  const getTableValue = ()=>{
      AdminServices.getAllAdminUsers().then((response)=>{
            setRow(response.SuperAdmins);
      })
  }
  // const root="https://meindoc.app/"

  const columns =[
      { field: 'UserName', headerName: 'NAME', width: 200 },
      { field: 'Email', headerName: 'MAIL', width: 260 },
      { field: 'PhoneNumber', headerName: 'PHONE', width: 220 },
      {field:'Status', headerName:'Status', width:200, renderCell:(params)=>{
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

export default AdminUserList