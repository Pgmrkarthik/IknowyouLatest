
import { authenticationService } from '../services/authservices';

const account = {
    displayName: authenticationService.currentUserValue.username,
    email: authenticationService.currentUserValue.email,
    photoURL: authenticationService.currentUserValue.username,
  };
  
export default account;