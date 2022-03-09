export function getYearth(date: string): number {
    return new Date().getFullYear() - new Date(date).getFullYear() + 1;
}

export function getDateAsISOLocalString(): string {
    return new Date(Date.now() + 9 * 3600000).toISOString().replace(/\..*/, '+09:00');
}

export function toRecordDate(date: Date) {
    function leftPadding(value: string | number, chara: string, length: number) {
        let s = '' + value;
        for (let i = s.length; i < length; i++) {
            s = chara + s;
        }
        return s;
    }
    const chara = "0";
    const year = leftPadding(date.getFullYear(), chara, 4);
    const month = leftPadding(date.getMonth() + 1, chara, 2);
    const day = leftPadding(date.getDate(), chara, 2);
    return `${year}-${month}-${day}`;
}
