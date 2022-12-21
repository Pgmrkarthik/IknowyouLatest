import { format, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}


// export function formatAMPM(date) {
//   var hours = date.getHours();
//   var minutes = date.getMinutes();
//   var strTime = '';
//   var hoursd= 0;
//   var ampm = hours >= 12 ? 'pm' : 'am';
//   hours %= 12;
//   if(hours){
//     hoursd = hours
//   }else{
//     hoursd = 12
//   }
//   minutes = minutes < 10 ? `0${minutes}` : minutes;
//   strTime = `${hoursd} : ${minutes + ampm}`;
//   return strTime;
// }
