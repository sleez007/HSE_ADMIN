export class DateFormatter {
    // returns date in 2022-12-22
    dateToString(date: Date){
        return date.toISOString().slice(0, 10)
    }
}