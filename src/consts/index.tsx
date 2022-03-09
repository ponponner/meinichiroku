import { nanoid } from "nanoid";
import { toRecordDate } from "../helpers";
import { Record } from "../pages";

export const APP_TITLE = '命日録';

export const LOCAL_STORAGE_KEY_RECORDS = 'records';

export const EXPORT_DATA_FILE_NAME = '命日録';

export const DEBUG_INITIAL_RECORDS: Record[] = [
    // 0 : 9
    { surname: '佐藤', name: '太郎', date: new Date(), remarks: "友人", enjoyment: 99 },
    { surname: '鈴木', name: '花子', date: new Date() },
    { surname: '佐藤', name: '太郎', date: new Date() },
    { surname: '鈴木', name: '花子', date: new Date() },
    { surname: '佐藤', name: '太郎', date: new Date() },
    { surname: '鈴木', name: '花子', date: new Date() },
    { surname: '佐藤', name: '太郎', date: new Date() },
    { surname: '鈴木', name: '花子', date: new Date() },
    { surname: '佐藤', name: '太郎', date: new Date() },
    { surname: '鈴木', name: '花子', date: new Date() },
    // 10 : 19
    { surname: '佐藤', name: '太郎', date: new Date() },
    { surname: '鈴木', name: '花子', date: new Date() },
    { surname: '佐藤', name: '太郎', date: new Date() },
    { surname: '鈴木', name: '花子', date: new Date() },
    { surname: '佐藤', name: '太郎', date: new Date() },
    { surname: '鈴木', name: '花子', date: new Date() },
    { surname: '佐藤', name: '太郎', date: new Date() },
    { surname: '鈴木', name: '花子', date: new Date() },
    { surname: '佐藤', name: '太郎', date: new Date() },
    { surname: '鈴木', name: '花子', date: new Date() },
    // 20 : 29
    { surname: '佐藤', name: '太郎', date: new Date() },
    { surname: '鈴木', name: '花子', date: new Date() },
    { surname: '佐藤', name: '太郎', date: new Date() },
    { surname: '鈴木', name: '花子', date: new Date() },
    { surname: '佐藤', name: '太郎', date: new Date() },
    { surname: '鈴木', name: '花子', date: new Date() },
    { surname: '佐藤', name: '太郎', date: new Date() },
    { surname: '鈴木', name: '花子', date: new Date() },
    { surname: '佐藤', name: '太郎', date: new Date() },
    { surname: '鈴木', name: '花子', date: new Date() },
    // 30 : 39
    { surname: '佐藤', name: '太郎', date: new Date() },
    { surname: '鈴木', name: '花子', date: new Date() },
    { surname: '佐藤', name: '太郎', date: new Date() },
    { surname: '鈴木', name: '花子', date: new Date() },
    { surname: '佐藤', name: '太郎', date: new Date() },
    { surname: '鈴木', name: '花子', date: new Date() },
    { surname: '佐藤', name: '太郎', date: new Date() },
    { surname: '鈴木', name: '花子', date: new Date() },
    { surname: '佐藤', name: '太郎', date: new Date() },
    { surname: '鈴木', name: '花子', date: new Date() },
].map(x => ({
    ...x,
    id: nanoid(),
    date: toRecordDate(x.date),
}));
