// Modules
import moment from 'moment';

export default class DateHelper {

  static parseDateFormat1ToFormat2(date:string, format1:string, format2:string) {
    return moment(date, format1).format(format2);
  }

  static getCurrentDateWithFormat (format:string) {
    return moment().format(format);
  }

}