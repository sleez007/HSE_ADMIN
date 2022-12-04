export class DateFormatter {
    // returns date in 2022-12-22
    static dateToString(date: Date){
        return date.toISOString().slice(0, 10)
    };

    static stringToDate(dateString: string) {
        return new Date(dateString)
    }
}