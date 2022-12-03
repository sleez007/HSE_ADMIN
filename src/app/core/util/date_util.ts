export class DateFormatter {
    // returns date in 2022-12-22
    static dateToString(date: Date){
        console.log(typeof date, date.toISOString().slice(0, 10)) ;

        return date.toISOString().slice(0, 10)
    }
}