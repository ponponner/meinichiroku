export const appVersion = process.env.GATSBY_APP_VERSION;

export function getYearth(dateString: string): number {
    const date = new Date(dateString);
    const today = new Date();
    const yearDiff = today.getFullYear() - date.getFullYear();
    // 命日が今日より先なら没年として0を返す。
    if (date.getTime() > today.getTime()) {
        return 0;
    }
    // 命日が今年中なら没年として1を返す。
    if (yearDiff === 0) {
        return 1;
    }
    // 命日が去年以前で、月日が今日より先、その場合は年数差と没年の値が1年変わるため算出する。
    const date2000 = new Date(2000, date.getMonth(), date.getDate());
    const today2000 = new Date(2000, today.getMonth(), today.getDate());
    const monthDateDiff = date2000.getTime() > today2000.getTime() ? -1 : 0;

    return yearDiff + monthDateDiff + 1;
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
