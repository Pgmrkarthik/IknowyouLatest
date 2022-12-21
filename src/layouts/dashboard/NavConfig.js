// component
import Iconify from '../../components/Iconify';

import { authenticationService } from '../../services/authservices';
import { Role } from '../../helpers/Role';


// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig =  () => {
  const currentUser = authenticationService.currentUserValue;
  if(!currentUser) return null;
  let returnConfig = null ;
  switch (authenticationService.currentUserValue.ApplicationUserRole) {

      case Role.ADMIN:
        returnConfig = [
          {
            title: 'Dashboard',
            path: '/Admin/dashboard',
            icon: getIcon('akar-icons:dashboard'),
          },
          {
            title: 'Admin',
            path: '/Admin/AdminUser',
            icon: getIcon('dashicons:admin-users'),
          },
          {
            title: 'Teachers',
            path: '/Admin/teacher',
            icon: getIcon('fluent-emoji-high-contrast:woman-teacher'),
          },
      
          {
            title: 'Customers',
            // path: '/Admin/customer',
            icon: getIcon('raphael:customer'),
          },
          {
            title: 'BabyGame',
            icon: getIcon('fa6-solid:children'),
            children:[
              {
                title:'Shuff A Little',
                path:'/Admin/BabyUnit'
              },
              {
                title:'PatAlong',
                path:'/Admin/PatALong'
              },
            ]    
          },
          // {
          //   title: 'PreSchooler',
          //   icon: getIcon('bi:people-fill'),
          // }
        ];
        break;

      case Role.TEACHER:
        returnConfig = [
            {
              title: 'Teacher',
              path: '/teacher',
              icon: getIcon('carbon:task-view'),
            },
            {
              title: 'BabyGame',
              icon: getIcon('bi:people-fill'),
              children:[
                {
                  title:'Shuff A Little',
                   path:'/Teacher/BabyUnit'
                },
                {
                  title:'PatAlong',
                  path:'/Teacher/PatAlong'
                },
              ]    
            },
            {
              title: 'PreSchooler',
              icon: getIcon('tabler:brand-youtube-kids'),
              path:'/Teacher/Preschooler'
            }
        
            // {
            //   title: 'New request',
            //   path: '/createRequest',
            //   icon: getIcon('eva:file-text-fill'),
            // },
            // {
            //   title: 'Viewer',
            //   path: '/Viewer',
            //   icon: getIcon('bi:unity'),
            // },
        
          ];
        break;

      // case Role.WORKER:
      //   returnConfig = [
      //             {
      //               title: 'View requests',
      //               path: '/home/list',
      //               icon: getIcon('carbon:task-view'),
      //             },
      //           ]
      //           break;
      default:
        return returnConfig;
  }
  return returnConfig;
}



export default navConfig;
