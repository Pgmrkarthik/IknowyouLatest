import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from './layouts/dashboard';
import SetMarker from './Page/CommonPages/Components/SetMarker';
import WordModification from './Page/CommonPages/Components/WordModificationComponent';
// pages and components
import Login from './Page/CommonPages/Login/Login';
import PatModifyWord from './Page/CommonPages/PatAlong/PatModifyWord';
import PatWordList from './Page/CommonPages/PatAlong/PatWordList';
import SetVideoMarker from './Page/CommonPages/PatAlong/SetVideoMarker';
import PatAlong from './Page/TeacherPages/PatAlong';
import ShuffALittle from './Page/TeacherPages/ShuffALittle';
import AddUnit from './Page/TeacherPages/ShuffALittle/AddUnit';
import WordComponent from './Page/TeacherPages/ShuffALittle/WordComponent';
import TeacherHome from './Page/TeacherPages/TeacherHome';
import Toddlers from './Page/TeacherPages/Toddlers';

 // Teacher Page


export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/home/',
      element: <DashboardLayout />,
      children:[
        {
          path:'',
          element:<TeacherHome />
        },
        {
          path:'toddlers',
          element:<Toddlers />
        },
        {
          path:'shuffalittle',
          element:<ShuffALittle />,
        },
        {
          path:'Shuffalittle/Unit',
          element:<AddUnit />,
          children:[
            {
              path:'',
              element:<WordComponent />
            },
            {
              path:'Modify',
              element:< WordModification/>
            },
            {
              path:'setMarker',
              element:<SetMarker />
            },
          ]
        },
        {
          path:'patalong/',
          element:<PatAlong />,
          children:[
            {
              path:'',
              element:<PatWordList />
            },
            {
              path:'Words',
              element:<PatWordList />
            },
            {
              path:'Modify',
              element:< PatModifyWord/>
            },
            {
              path:'setMarker',
              element:<SetVideoMarker />
            },

          ]
        },
      ]
    },

  ]);
}
