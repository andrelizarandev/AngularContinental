// Modules
import moment from 'moment';

export default class HandleDates {

  static parseDateFormat1ToFormat2(date:string, format1:string, format2:string) {
    return moment(date, format1).format(format2);
  }

}