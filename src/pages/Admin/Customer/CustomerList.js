import React, { useEffect, useState }  from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';

// 
import {AdminServices} from '../../../services/Admin.services';

WorkerListComponent.propTypes={
  data: PropTypes.bool
}

function WorkerListComponent(props) {
  const [rows, setRow] = useState([]);
  const getTableValue = ()=>{
      AdminServices.getAllWorker().then((response)=>{
            setRow(response.Workers);
      })
  }
  // const root="https://meindoc.app/"

  const columns =[
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'UserName', headerName: 'NAME', width: 200 },
      { field: 'Email', headerName: 'MAIL', width: 260 },
      { field: 'Phone', headerName: 'PHONE', width: 220 }
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

export default WorkerListComponent